package com.medisync.medisync_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "alerts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alert_id")
    private Long alertId;

    /*
     * Existing medicine selected from inventory.
     * Null when pharmacist requests a completely new medicine.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    /*
     * Used only when the medicine does not exist in inventory.
     */
    @Column(name = "requested_medicine_name", length = 150)
    private String requestedMedicineName;

    /*
     * LOW_STOCK
     * RESTOCK_REQUEST
     * CUSTOMER_DEMAND
     * SPECIAL_ORDER
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlertType alertType;

    /*
     * Pharmacist request details or
     * system generated alert description.
     */
    @Column(nullable = false, length = 1000)
    private String description;

    /*
     * NEW
     * PENDING
     * APPROVED
     * REJECTED
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private AlertStatus status = AlertStatus.NEW;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
}