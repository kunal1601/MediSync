package com.medisync.medisync_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medisync.medisync_backend.entity.SalesInvoiceItem;

public interface StockOverviewRepository extends JpaRepository<SalesInvoiceItem, Integer>{
	//1. Sales By drug Type
	@Query("""
			SELECT m.category,SUM(sii.quantity) 
			FROM SalesInvoiceItem sii
			JOIN sii.medicine m
			GROUP BY m.category
			ORDER BY SUM(sii.quantity) DESC""")
	List<Object[]> getSalesByDrugType();
	
	//2.Sales BY Company Name
	@Query("""
			SELECT m.manufacturer,SUM(sii.quantity)
			FROM SalesInvoiceItem sii
			JOIN sii.medicine m
			GROUP BY m.manufacturer
			ORDER BY SUM(sii.quantity) DESC""")
	List<Object[]> getSalesByCompanyName();
	
	
	//3.Sales By Year
	@Query(value="""
			
			SELECT YEAR(si.created_at), SUM(sii.quantity)
			FROM sales_invoice_items sii
			JOIN sales_invoices si
			ON sii.invoice_id=si.invoice_id
			GROUP BY YEAR(si.created_at)
			ORDER BY YEAR(si.created_at)""",nativeQuery=true)
	List<Object[]> getSalesByYear();
	
	 // 4. Most Sold Medicines
    @Query("""
            SELECT m.name, SUM(sii.quantity)
            FROM SalesInvoiceItem sii
            JOIN sii.medicine m
            GROUP BY m.name
            ORDER BY SUM(sii.quantity) DESC
            """)
    List<Object[]> getMostSoldMedicines();
}
