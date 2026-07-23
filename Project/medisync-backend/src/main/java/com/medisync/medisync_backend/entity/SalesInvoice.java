package com.medisync.medisync_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "sales_invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesInvoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Integer invoiceId;

    @Column(name = "invoice_number", nullable = false, unique = true, length = 50)
    private String invoiceNumber;

    // 🌟 Updated: Pointing directly to Pharmacist entity and pharmacists(id)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pharmacist_id", referencedColumnName = "id", nullable = true)
    private Pharmacist pharmacist;

    @Column(name = "gross_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal grossTotal;

    @Column(name = "tax_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal taxAmount;

    @Column(name = "net_payable", nullable = false, precision = 10, scale = 2)
    private BigDecimal netPayable;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}