package com.medisync.medisync_backend.service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medisync.medisync_backend.entity.AlertType;
import com.medisync.medisync_backend.entity.MedicineStock;
import com.medisync.medisync_backend.dto.AlertRequestDto;
import com.medisync.medisync_backend.dto.AlertResponseDto;
import com.medisync.medisync_backend.entity.Alert;
import com.medisync.medisync_backend.entity.AlertStatus;
import com.medisync.medisync_backend.entity.Medicine;
import com.medisync.medisync_backend.repository.AlertRepository;
import com.medisync.medisync_backend.repository.MedicineRepository;
import com.medisync.medisync_backend.repository.MedicineStockRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;
    private final MedicineRepository medicineRepository;
    private final MedicineStockRepository medicineStockRepository;
    
    @Override
    @Transactional
    public void generateSystemAlerts() {

        System.out.println("Inside generateSystemAlerts()");

        generateStockAlerts();

        generateExpiryAlerts();

        System.out.println("Finished generateSystemAlerts()");
    }
    
    
    private void generateStockAlerts() {

        List<Medicine> medicines = medicineRepository.findAll();

        for (Medicine medicine : medicines) {

            int totalStock = medicine.getStocks()
                    .stream()
                    .mapToInt(MedicineStock::getStockQuantity)
                    .sum();

            AlertType alertType = null;

            if (totalStock == 0) {

                alertType = AlertType.OUT_OF_STOCK;

            } else if (totalStock <= 10) {

                alertType = AlertType.LOW_STOCK;
            }

            // Stock is healthy
            if (alertType == null) {
                continue;
            }

            // Check if NEW alert already exists
            boolean alreadyExists = !alertRepository
                    .findByMedicineAndAlertTypeAndStatusIn(
                            medicine,
                            alertType,
                            List.of(
                                    AlertStatus.NEW,
                                    AlertStatus.PENDING
                            )
                    )
                    .isEmpty();

            if (alreadyExists) {
                continue;
            }

            Alert alert = Alert.builder()
                    .medicine(medicine)
                    .medicineStock(null)
                    .alertType(alertType)
                    .description(
                            alertType == AlertType.OUT_OF_STOCK
                                    ? medicine.getName() + " is out of stock."
                                    : medicine.getName() + " stock is running low."
                    )
                    .status(AlertStatus.NEW)
                    .build();

            alertRepository.save(alert);
        }
    }


    private void generateExpiryAlerts() {

        LocalDate today = LocalDate.now();

        LocalDate nearExpiryDate = today.plusDays(30);

        List<MedicineStock> stocks = medicineStockRepository.findAll();

        for (MedicineStock stock : stocks) {

            AlertType alertType = null;

            if (stock.getExpiryDate().isBefore(today)) {

                alertType = AlertType.EXPIRED;

            } else if (!stock.getExpiryDate().isAfter(nearExpiryDate)) {

                alertType = AlertType.NEAR_EXPIRY;
            }

            // Not expired and not near expiry
            if (alertType == null) {
                continue;
            }

            // Duplicate check
            boolean alreadyExists = !alertRepository
                    .findByMedicineStockAndAlertTypeAndStatusIn(
                            stock,
                            alertType,
                            List.of(
                                    AlertStatus.NEW,
                                    AlertStatus.PENDING
                            )
                    )
                    .isEmpty();

            if (alreadyExists) {
                continue;
            }

            Alert alert = Alert.builder()
                    .medicine(stock.getMedicine())
                    .medicineStock(stock)
                    .alertType(alertType)
                    .description(
                            alertType == AlertType.EXPIRED
                                    ? stock.getMedicine().getName()
                                            + " (Batch " + stock.getBatchNumber() + ") has expired."
                                    : stock.getMedicine().getName()
                                            + " (Batch " + stock.getBatchNumber() + ") will expire within 30 days."
                    )
                    .status(AlertStatus.NEW)
                    .build();

            alertRepository.save(alert);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlertResponseDto> getSystemGeneratedAlerts() {

        return alertRepository.findByStatus(AlertStatus.NEW)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlertResponseDto> getRequestsSentToAdmin() {

        return alertRepository.findByStatusInOrderByCreatedAtDesc(
                List.of(
                        AlertStatus.PENDING,
                        AlertStatus.APPROVED,
                        AlertStatus.REJECTED))
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public AlertResponseDto raiseNewRequest(AlertRequestDto requestDto) {

        Medicine medicine = null;
        String requestedMedicineName = null;

        // Existing medicine selected from dropdown
        if (requestDto.getMedicineId() != null) {

            medicine = medicineRepository.findById(requestDto.getMedicineId())
                    .orElseThrow(() ->
                            new RuntimeException("Medicine not found with ID : "
                                    + requestDto.getMedicineId()));
        }

        // Pharmacist typed medicine manually
        else {

            Optional<Medicine> optionalMedicine =
                    medicineRepository.findByNameIgnoreCase(requestDto.getMedicineName());

            if (optionalMedicine.isPresent()) {

                medicine = optionalMedicine.get();

            } else {

                requestedMedicineName = requestDto.getMedicineName();
            }
        }

        String description = requestDto.getDescription() != null
                ? requestDto.getDescription().trim()
                : "";

        if (requestDto.getAlertType() == AlertType.OTHER
                && requestDto.getCustomRequestType() != null
                && !requestDto.getCustomRequestType().isBlank()) {

            String customType = requestDto.getCustomRequestType().trim();
            description = description.isEmpty()
                    ? "Request type: " + customType
                    : "Request type: " + customType + " — " + description;
        }

        Alert alert = Alert.builder()
                .medicine(medicine)
                .requestedMedicineName(requestedMedicineName)
                .alertType(requestDto.getAlertType())
                .description(description.isEmpty() ? "No additional details provided." : description)
                .status(AlertStatus.PENDING)
                .build();

        Alert savedAlert = alertRepository.save(alert);

        return mapToResponse(savedAlert);
    }

    @Override
    @Transactional
    public AlertResponseDto sendAlertToAdmin(Long alertId) {

        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() ->
                        new RuntimeException("Alert not found with ID : " + alertId));

        if (alert.getStatus() != AlertStatus.NEW) {
            throw new RuntimeException("Only NEW alerts can be sent to admin.");
        }

        alert.setStatus(AlertStatus.PENDING);

        return mapToResponse(alertRepository.save(alert));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlertResponseDto> getPendingRequests() {

        return alertRepository.findByStatus(AlertStatus.PENDING)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AlertResponseDto> getManualRequests() {

        return alertRepository.findByAlertTypeInOrderByCreatedAtDesc(
                List.of(
                        AlertType.RESTOCK_REQUEST,
                        AlertType.CUSTOMER_DEMAND,
                        AlertType.SPECIAL_ORDER,
                        AlertType.NEW_MEDICINE,
                        AlertType.OTHER
                ))
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    public AlertResponseDto approveRequest(Long alertId) {

        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() ->
                        new RuntimeException("Alert not found with ID : " + alertId));

        if (alert.getStatus() != AlertStatus.PENDING) {
            throw new RuntimeException("Only pending requests can be approved.");
        }

        alert.setStatus(AlertStatus.APPROVED);

        return mapToResponse(alertRepository.save(alert));
    }

    @Override
    public AlertResponseDto rejectRequest(Long alertId) {

        Alert alert = alertRepository.findById(alertId)
                .orElseThrow(() ->
                        new RuntimeException("Alert not found with ID : " + alertId));

        if (alert.getStatus() != AlertStatus.PENDING) {
            throw new RuntimeException("Only pending requests can be rejected.");
        }

        alert.setStatus(AlertStatus.REJECTED);

        return mapToResponse(alertRepository.save(alert));
    }
    private AlertResponseDto mapToResponse(Alert alert) {

        return AlertResponseDto.builder()
                .alertId(alert.getAlertId())

                .medicineId(
                        alert.getMedicine() != null
                                ? alert.getMedicine().getMedicineId()
                                : null
                )

                .medicineName(
                        alert.getMedicine() != null
                                ? alert.getMedicine().getName()
                                : alert.getRequestedMedicineName()
                )

                .alertType(alert.getAlertType())

                .description(alert.getDescription())

                .status(alert.getStatus())

                // NEW CODE STARTS HERE
                .stockId(
                        alert.getMedicineStock() != null
                                ? alert.getMedicineStock().getStockId()
                                : null
                )

                .batchNumber(
                        alert.getMedicineStock() != null
                                ? alert.getMedicineStock().getBatchNumber()
                                : null
                )

                .expiryDate(
                        alert.getMedicineStock() != null
                                ? alert.getMedicineStock().getExpiryDate()
                                : null
                )
                // NEW CODE ENDS HERE

                .createdAt(alert.getCreatedAt())

                .build();
    }
}