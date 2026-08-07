package com.medisync.medisync_backend.dto.billing;

import java.math.BigDecimal;

import com.medisync.medisync_backend.entity.Medicine.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BillingMedicineResponse {

    private Long stockId;

    private String itemCode;

    private String medicineName;

    private String manufacturer;

    private Category category;

    private BigDecimal sellingPrice;

    private Integer availableStock;

    private String batchNumber;
}