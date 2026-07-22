package com.medisync.medisync_backend.service;

import com.medisync.medisync_backend.entity.SalesInvoice;
import com.medisync.medisync_backend.repository.SalesInvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SalesInvoiceService {

    private final SalesInvoiceRepository salesInvoiceRepository;

    // Fetch complete historical ledger entries for corporate auditing
    @Transactional(readOnly = true)
    public List<SalesInvoice> getAllInvoices() {
        return salesInvoiceRepository.findAll();
    }

    // Lookup transaction record matching a target invoice reference number
    @Transactional(readOnly = true)
    public Optional<SalesInvoice> getInvoiceByNumber(String invoiceNumber) {
        return salesInvoiceRepository.findByInvoiceNumber(invoiceNumber);
    }

    // Process a newly calculated billing record securely
    @Transactional
    public SalesInvoice createInvoice(SalesInvoice invoice) {
        // Business logic rule: Assign structured format markers if blank
        if (invoice.getInvoiceNumber() == null || invoice.getInvoiceNumber().isEmpty()) {
            invoice.setInvoiceNumber("INV-" + System.currentTimeMillis());
        }
        return salesInvoiceRepository.save(invoice);
    }

    // Pull core metrics for dashboard financial tracking cards
    @Transactional(readOnly = true)
    public BigDecimal getTotalRevenueMetric() {
        BigDecimal total = salesInvoiceRepository.calculateTotalGrossRevenue();
        return (total != null) ? total : BigDecimal.ZERO;
    }
}