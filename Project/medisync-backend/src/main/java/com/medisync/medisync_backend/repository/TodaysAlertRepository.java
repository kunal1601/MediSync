package com.medisync.medisync_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medisync.medisync_backend.entity.MedicineStock;

@Repository
public interface TodaysAlertRepository extends JpaRepository<MedicineStock, Long> {

    /*
     * Medicine is Out Of Stock only when
     * total stock across all its batches is 0.
     */
	@Query("""
		    SELECT ms
		    FROM MedicineStock ms
		    WHERE ms.medicine.id IN (
		        SELECT ms2.medicine.id
		        FROM MedicineStock ms2
		        GROUP BY ms2.medicine.id
		        HAVING SUM(ms2.stockQuantity) = 0
		    )
		    AND ms.id = (
		        SELECT MIN(ms3.id)
		        FROM MedicineStock ms3
		        WHERE ms3.medicine.id = ms.medicine.id
		    )
		""")
		List<MedicineStock> getOutOfStockMedicines();


    /*
     * Medicine is Near Expiry if any batch
     * expires within the next 30 days.
     */
	@Query(value = """
		    SELECT ms.*
		    FROM medicine_stock ms
		    WHERE ms.expiry_date BETWEEN CURDATE()
		    AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
		    AND ms.stock_id = (
		        SELECT MIN(ms2.stock_id)
		        FROM medicine_stock ms2
		        WHERE ms2.medicine_id = ms.medicine_id
		        AND ms2.expiry_date BETWEEN CURDATE()
		        AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
		    )
		""", nativeQuery = true)
		List<MedicineStock> getNearExpiryMedicines();


    /*
     * Medicine is Expired if any batch has expired.
     */
	@Query("""
		    SELECT ms
		    FROM MedicineStock ms
		    WHERE ms.expiryDate < CURRENT_DATE
		    AND ms.id = (
		        SELECT MIN(ms2.id)
		        FROM MedicineStock ms2
		        WHERE ms2.medicine.id = ms.medicine.id
		        AND ms2.expiryDate < CURRENT_DATE
		    )
		""")
		List<MedicineStock> getExpiredMedicines();
}
