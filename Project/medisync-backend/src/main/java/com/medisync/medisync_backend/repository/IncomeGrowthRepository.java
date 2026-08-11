package com.medisync.medisync_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medisync.medisync_backend.entity.SalesInvoice;

public interface IncomeGrowthRepository  extends JpaRepository<SalesInvoice,Integer>{
	//By Weekly
	@Query(value="""
			SELECT 
				DATE(created_at) AS label,
				SUM(gross_total -
			 	(gross_total * discount_percentage / 100)
			 ) AS income
			FROM sales_invoices
			WHERE created_at>=CURDATE()-INTERVAL 6 DAY
			GROUP BY DATE(created_at)
			ORDER BY DATE(created_at)
			""",nativeQuery=true)
	  List<Object[]> getWeeklyIncome();
	  
	  //By Monthly
	  @Query(value="""
	  		SELECT 
	  			DATE(created_at) AS label,
	  			SUM(gross_total -
	  			(gross_total * discount_percentage / 100)
	  		) AS income
	  		FROM sales_invoices
	  		WHERE created_at>=CURDATE()- Interval 29 DAY
	  		GROUP BY DATE(created_at)
	  		ORDER BY DATE(created_at)
	  		""",nativeQuery=true)
	  List<Object[]> getMonthlyIncome();
	  
	  //By Yearly
	  @Query(value="""
	  		SELECT
			    YEAR(created_at) AS label,
			    SUM(gross_total -
	  				 (gross_total * discount_percentage / 100)
	  			) AS income
			FROM sales_invoices
			WHERE YEAR(created_at) >= YEAR(CURDATE()) - 4
			GROUP BY YEAR(created_at)
			ORDER BY YEAR(created_at);
	  		""",nativeQuery=true)
	  List<Object[]> getYearlyIncome();
}
