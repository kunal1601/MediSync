package com.medisync.medisync_backend.service;

import com.medisync.medisync_backend.entity.Medicine;
import com.medisync.medisync_backend.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;

    // Fetch all records currently stored in inventory
    @Transactional(readOnly = true)
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // Lookup a single product stock record by barcode scan code
    @Transactional(readOnly = true)
    public Optional<Medicine> getMedicineByItemCode(String itemCode) {
        return medicineRepository.findByItemCode(itemCode);
    }

    // Save or update an existing inventory item layout
    @Transactional
    public Medicine saveOrUpdateMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    // High-performance database processing to pull categorical chart matrices
    @Transactional(readOnly = true)
    public List<Object[]> getStockAnalyticsData() {
        return medicineRepository.getStockCountByCategory();
    }

    // Grab safety list warnings for nearly expired items
    @Transactional(readOnly = true)
    public List<Medicine> getExpiringBatches() {
        return medicineRepository.findExpiringMedicinesWithinMonth();
    }
}