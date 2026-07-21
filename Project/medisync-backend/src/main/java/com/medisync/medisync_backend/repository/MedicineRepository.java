package com.medisync.medisync_backend.repository;

import com.medisync.medisync_backend.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    
    // Quick barcode/item lookup method for the smart billing console
    Optional<Medicine> findByItemCode(String itemCode);
    
    // High-performance query to aggregate stock volume for your frontend dashboard chart
    @Query("SELECT m.category, SUM(m.stockQuantity) FROM Medicine m GROUP BY m.category")
    List<Object[]> getStockCountByCategory();
    
    // Utility check to flag near-expiry inventory batches
    @Query("SELECT m FROM Medicine m WHERE m.expiryDate <= CURRENT_DATE + 30")
    List<Medicine> findExpiringMedicinesWithinMonth();
}