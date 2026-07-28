package com.medisync.medisync_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.medisync.medisync_backend.entity.SalesInvoice;

public interface ProfitLossRepository extends JpaRepository<SalesInvoice,Integer> {

    // Total Revenue
    @Query(value = """
            SELECT IFNULL(SUM(net_payable),0)
            FROM sales_invoices
            """, nativeQuery = true)
    Double getTotalRevenue();


    // Total Cost
    @Query(value = """
            SELECT IFNULL(SUM(
                    sii.quantity * ms.purchase_price
            ),0)
            FROM sales_invoice_items sii
            JOIN medicine_stock ms
            ON sii.stock_id = ms.stock_id
            """, nativeQuery = true)
    Double getTotalCost();


    // Total Loss
    @Query(value = """
            SELECT IFNULL(SUM(loss_amount),0)
            FROM inventory_losses
            """, nativeQuery = true)
    Double getTotalLoss();

}