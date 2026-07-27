package com.medisync.medisync_backend.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medisync.medisync_backend.entity.MedicineStock;

public interface PharmacistDashStatisticsRepository extends JpaRepository<MedicineStock, Long>{
	@Query(value = """
			SELECT COALESCE(SUM(net_payable),0)
			FROM sales_invoices
			WHERE MONTH(created_at)=MONTH(CURDATE())
			AND YEAR(created_at)=YEAR(CURDATE())
			""",nativeQuery = true)
			BigDecimal getCurrentMonthSales();
	
	@Query(value="""
			SELECT COUNT(*)
			FROM sales_invoices
			WHERE DATE(created_at)=CURDATE()
			""",nativeQuery=true)
			Long getBillsToday();
	
	@Query("""
			SELECT COUNT(ms)
			FROM MedicineStock ms
			WHERE ms.stockQuantity < 30
			""")
			Long getLowStockItems();
	
	@Query(value = """
	        SELECT COUNT(*)
	        FROM medicine_stock
	        WHERE expiry_date BETWEEN CURDATE()
	        AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
	        """, nativeQuery = true)
	Long getExpiringMedicines();
}
