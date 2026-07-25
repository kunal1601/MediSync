package com.medisync.medisync_backend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class MedicineStockResponse {

    private Long stockId;

    private String medicineName;

    private String batchNumber;

    private String manufacturer;

    private Integer stockQuantity;

    private LocalDate expiryDate;

    private String status;
}
