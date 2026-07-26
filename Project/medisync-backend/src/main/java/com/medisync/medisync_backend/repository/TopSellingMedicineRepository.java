package com.medisync.medisync_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medisync.medisync_backend.entity.SalesInvoiceItem;

public interface TopSellingMedicineRepository extends JpaRepository<SalesInvoiceItem, Integer> {

	@Query(value="""
			SELECT m.name, SUM(sii.quantity) AS totalSold
			FROM sales_invoice_items sii
			JOIN medicines m
				ON sii.medicine_id=m.medicine_id
			GROUP BY 
				m.name,
				m.medicine_id
			ORDER BY 
			 	totalSold DESC
			LIMIT 4
			""",nativeQuery=true)
	List<Object[]> getTopSellingMedicines();
}
