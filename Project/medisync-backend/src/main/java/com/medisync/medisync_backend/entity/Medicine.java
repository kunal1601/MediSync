package com.medisync.medisync_backend.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "medicines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicine {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_id")
    private Integer medicineId;

    // Unique code used throughout the application
    @Column(name = "item_code", nullable = false, unique = true)
    private String itemCode;

    // Medicine name
    @Column(nullable = false)
    private String name;

    // Medicine category
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    // Manufacturer name
    @Column(nullable = false)
    private String manufacturer;

    // Record creation timestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /*
        One Medicine
              |
              |
             Many
        MedicineStock

        cascade = ALL
        -> Saving Medicine also saves its stock records.

        orphanRemoval = true
        -> Removing a stock object from the list deletes it from DB.
     */
    @OneToMany(
            mappedBy = "medicine",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @JsonBackReference
    private List<MedicineStock> stocks = new ArrayList<>();

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum Category {
        TABLETS,
        CAPSULES,
        SYRUPS,
        DROPS,
        INJECTIONS,
        OINTMENTS
    }
}