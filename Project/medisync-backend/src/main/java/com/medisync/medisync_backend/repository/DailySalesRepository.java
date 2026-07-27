package com.medisync.medisync_backend.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medisync.medisync_backend.entity.SalesInvoice;

public interface DailySalesRepository extends JpaRepository<SalesInvoice, Integer> {
	 // Total Sales for selected date
	@Query(value="""
			SELECT COALESCE(SUM(net_payable),0)
			FROM sales_invoices
			WHERE DATE(created_at)=:date
			""",nativeQuery = true)
	BigDecimal getSalesToday(@Param("date") LocalDate date);
	
	// Bills Generated
	@Query(value="""
			SELECT COUNT(*)
			FROM sales_invoices
			WHERE DATE(created_at)=:date
			""",nativeQuery=true)
	Long getBillsGenerated(@Param("date") LocalDate date);
	
	// Average Bill Value
	@Query(value="""
			SELECT COALESCE(AVG(net_payable),0)
			FROM sales_invoices
			WHERE DATE(created_at)=:date
			""",nativeQuery=true)
	BigDecimal getAverageBillValue(@Param("date") LocalDate date);
	
}
