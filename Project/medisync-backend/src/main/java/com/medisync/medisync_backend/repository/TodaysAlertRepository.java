package com.medisync.medisync_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medisync.medisync_backend.entity.MedicineStock;

public interface TodaysAlertRepository extends JpaRepository<MedicineStock, Long> {
	 /*
     * Medicines having zero stock
     */
	@Query("""
			SELECT ms 
			FROM MedicineStock ms
			WHERE ms.stockQuantity=0
			""")
	List<MedicineStock> getOutOfStockMedicines();
	
	 /*
     * Medicines expiring within next 30 days
     */
	@Query(value = """
		    SELECT *
		    FROM medicine_stock
		    WHERE expiry_date BETWEEN CURDATE()
		    AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
		    """, nativeQuery = true)
	List<MedicineStock> getNearExpiryMedicines();
	
	   /*
     * Medicines already expired
     */
	@Query("""
			SELECT ms
			FROM MedicineStock ms
			WHERE ms.expiryDate<CURRENT_DATE
			""")
	List<MedicineStock> getExpiredMedicines();
}
