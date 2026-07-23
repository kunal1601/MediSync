package com.medisync.medisync_backend.repository;

import com.medisync.medisync_backend.entity.SalesInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface SalesInvoiceRepository extends JpaRepository<SalesInvoice, Integer> {

    // Find a specific transaction record by its generated bill number
    Optional<SalesInvoice> findByInvoiceNumber(String invoiceNumber);

    // 🌟 FIXED: Querying Pharmacist entity primary key 'id' (Long) instead of legacy 'userId' (Integer)
    List<SalesInvoice> findByPharmacist_Id(Long pharmacistId);

    // Admin dashboard aggregation: Calculate total gross revenue generated to date
    @Query("SELECT SUM(s.netPayable) FROM SalesInvoice s")
    BigDecimal calculateTotalGrossRevenue();
}