package com.medisync.medisync_backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "inventory_losses")
@Getter
@Setter
public class InventoryLoss {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loss_id")
    private Long lossId;

    // Relation with MedicineStock
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false)
    private MedicineStock stock;

    // Relation with Medicine
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    // Relation with Pharmacist (Who reported the loss)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_by")
    private Pharmacist pharmacist;

    @Column(nullable = false)
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "loss_type", nullable = false)
    private LossType lossType;

    private String reason;

    @Column(name = "loss_amount", nullable = false)
    private BigDecimal lossAmount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Automatically sets current timestamp before inserting
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    // Default Constructor
    public InventoryLoss() {
    }
}