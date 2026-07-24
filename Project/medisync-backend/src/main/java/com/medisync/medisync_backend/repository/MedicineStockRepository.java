package com.medisync.medisync_backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medisync.medisync_backend.entity.Medicine;
import com.medisync.medisync_backend.entity.MedicineStock;

@Repository
public interface MedicineStockRepository extends JpaRepository<MedicineStock, Integer> {

    Optional<MedicineStock> findByMedicineAndBatchNumber(
            Medicine medicine,
            String batchNumber
    );

    List<MedicineStock> findByMedicineOrderByExpiryDateAsc(
            Medicine medicine
    );

    @Query("""
        SELECT ms
        FROM MedicineStock ms
        WHERE ms.expiryDate <= :date
        ORDER BY ms.expiryDate
        """)
    List<MedicineStock> findExpiringMedicinesBefore(LocalDate date);

    @Query("""
        SELECT ms.medicine.category,
               SUM(ms.stockQuantity)
        FROM MedicineStock ms
        GROUP BY ms.medicine.category
        """)
    List<Object[]> getStockCountByCategory();
}