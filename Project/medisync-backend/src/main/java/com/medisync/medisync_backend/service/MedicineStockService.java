package com.medisync.medisync_backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medisync.medisync_backend.dto.AddStockRequest;
import com.medisync.medisync_backend.entity.Medicine;
import com.medisync.medisync_backend.entity.MedicineStock;
import com.medisync.medisync_backend.repository.MedicineRepository;
import com.medisync.medisync_backend.repository.MedicineStockRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicineStockService {

    private final MedicineRepository medicineRepository;
    private final MedicineStockRepository medicineStockRepository;

    public MedicineStock addStock(AddStockRequest request) {

        // Step 1: Check whether medicine already exists
        Optional<Medicine> optionalMedicine =
                medicineRepository.findByItemCode(request.getItemCode());

        Medicine medicine;

        if (optionalMedicine.isPresent()) {
            medicine = optionalMedicine.get();
        } else {

            medicine = Medicine.builder()
                    .itemCode(request.getItemCode())
                    .name(request.getName())
                    .manufacturer(request.getManufacturer())
                    .category(request.getCategory())
                    .build();

            medicine = medicineRepository.save(medicine);
        }

        // Step 2: Check whether batch already exists
        Optional<MedicineStock> optionalStock =
                medicineStockRepository.findByMedicineAndBatchNumber(
                        medicine,
                        request.getBatchNumber());

        if (optionalStock.isPresent()) {

            MedicineStock existingStock = optionalStock.get();

            // Same batch must have same expiry
            if (!existingStock.getExpiryDate().equals(request.getExpiryDate())) {
                throw new IllegalArgumentException(
                        "Same batch cannot have different expiry date.");
            }

            // Same batch must have same selling price
            if (existingStock.getSellingPrice()
                    .compareTo(request.getSellingPrice()) != 0) {
                throw new IllegalArgumentException(
                        "Selling price cannot be changed for an existing batch.");
            }

            // Latest purchase price from supplier
            existingStock.setPurchasePrice(request.getPurchasePrice());

            // Increase stock
            existingStock.setStockQuantity(
                    existingStock.getStockQuantity()
                            + request.getStockQuantity());

            return medicineStockRepository.save(existingStock);
        }

        // Step 3: Create new batch
        MedicineStock newStock = MedicineStock.builder()
                .medicine(medicine)
                .batchNumber(request.getBatchNumber())
                .expiryDate(request.getExpiryDate())
                .purchasePrice(request.getPurchasePrice())
                .sellingPrice(request.getSellingPrice())
                .stockQuantity(request.getStockQuantity())
                .build();

        return medicineStockRepository.save(newStock);
    }

    @Transactional(readOnly = true)
    public List<MedicineStock> getExpiringMedicines() {

        return medicineStockRepository.findExpiringMedicinesBefore(
                LocalDate.now().plusDays(30));
    }

    @Transactional(readOnly = true)
    public List<Object[]> getStockAnalyticsData() {

        return medicineStockRepository.getStockCountByCategory();
    }

}