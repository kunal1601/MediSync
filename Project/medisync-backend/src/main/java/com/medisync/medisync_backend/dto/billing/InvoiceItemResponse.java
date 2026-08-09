package com.medisync.medisync_backend.dto.billing;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceItemResponse {

    private String medicineName;
    private String manufacturer;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal lineTotal;
}