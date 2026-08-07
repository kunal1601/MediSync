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
			ORDER BY SUM(sii.quantity) DESC LIMIT 10""")
	List<Object[]> getSalesByCompanyName();
	
	
	//3.Sales By Year
	@Query(value="""
			
			SELECT YEAR(si.created_at), SUM(sii.quantity)
			FROM sales_invoice_items sii
			JOIN sales_invoices si
			ON sii.invoice_id=si.invoice_id
			GROUP BY YEAR(si.created_at)
			ORDER BY YEAR(si.created_at) """,nativeQuery=true)
	List<Object[]> getSalesByYear();
	
	 // 4. Most Sold Medicines
    @Query("""
            SELECT m.name, SUM(sii.quantity)
            FROM SalesInvoiceItem sii
            JOIN sii.medicine m
            GROUP BY m.name
            ORDER BY SUM(sii.quantity) DESC LIMIT 7
            """)
    List<Object[]> getMostSoldMedicines();
    
    
    
  //Admin Stock Overview Chart
    
    //1. By Drug Type
    @Query("""
    		SELECT
    		m.category,
    		SUM(sii.quantity * sii.price)
    		FROM SalesInvoiceItem sii
    		JOIN sii.medicine m
    		GROUP BY m.category
    		ORDER BY SUM(sii.quantity * sii.price) DESC
    		""")
    List<Object[]> getRevenueByDrugType();
    
    
    //2. By Company
    @Query("""
    		SELECT
    		m.manufacturer,
    		SUM(sii.quantity * sii.price)
    		FROM SalesInvoiceItem sii
    		JOIN sii.medicine m
    		GROUP BY m.manufacturer
    		ORDER BY SUM(sii.quantity * sii.price) DESC LIMIT 10
    		""")
    List<Object[]> getRevenueByCompany();
    
    //3.By Most Sold Medicines
    @Query("""
    		SELECT
    		m.name,
    		SUM(sii.quantity * sii.price)
    		FROM SalesInvoiceItem sii
    		JOIN sii.medicine m
    		GROUP BY m.name
    		ORDER BY SUM(sii.quantity * sii.price) DESC LIMIT 7
    		
    		""")
    List<Object[]> getRevenueByMedicine();
    
    //4. By Year
    @Query(value = """
    		SELECT
    		YEAR(si.created_at),
    		SUM(sii.quantity * sii.price)
    		FROM sales_invoice_items sii
    		JOIN sales_invoices si
    		ON sii.invoice_id = si.invoice_id
    		GROUP BY YEAR(si.created_at)
    		ORDER BY YEAR(si.created_at) 
    		""", nativeQuery = true)
    List<Object[]> getRevenueByYear();
}
