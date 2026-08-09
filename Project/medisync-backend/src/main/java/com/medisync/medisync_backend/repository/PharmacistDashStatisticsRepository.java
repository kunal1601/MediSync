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
	
	@Query(value = """
		    SELECT COUNT(*)
		    FROM (
		        SELECT medicine_id
		        FROM medicine_stock
		        GROUP BY medicine_id
		        HAVING SUM(stock_quantity) > 0
		           AND SUM(stock_quantity) <= 10
		    ) AS low_stock_medicines
		    """, nativeQuery = true)
		Long getLowStockItems();
	
	@Query(value = """
		    SELECT COUNT(*)
		    FROM medicine_stock
		    WHERE expiry_date >= CURDATE()
		      AND expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
		    """, nativeQuery = true)
		Long getExpiringMedicines();
		
}
