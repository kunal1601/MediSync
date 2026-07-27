package com.medisync.medisync_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medisync.medisync_backend.dto.AlertRequestDto;
import com.medisync.medisync_backend.dto.AlertResponseDto;
import com.medisync.medisync_backend.entity.Alert;
import com.medisync.medisync_backend.entity.AlertStatus;
import com.medisync.medisync_backend.entity.Medicine;
import com.medisync.medisync_backend.repository.AlertRepository;
import com.medisync.medisync_backend.repository.MedicineRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;
    private final MedicineRepository medicineRepository;

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

        return alertRepository.findByStatusIn(
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

        Alert alert = Alert.builder()
                .medicine(medicine)
                .requestedMedicineName(requestedMedicineName)
                .alertType(requestDto.getAlertType())
                .description(requestDto.getDescription())
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
                .createdAt(alert.getCreatedAt())
                .build();
    }
}