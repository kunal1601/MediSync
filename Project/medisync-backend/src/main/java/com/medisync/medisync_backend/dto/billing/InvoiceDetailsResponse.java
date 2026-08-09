package com.medisync.medisync_backend.dto.billing;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDetailsResponse {

    private String invoiceNumber;
    private LocalDateTime createdAt;
    private String paymentMode;

    private BigDecimal grossTotal;
    private BigDecimal discountPercentage;
    private BigDecimal taxAmount;
    private BigDecimal grandTotal;

    private CustomerRequest customer;

    private List<InvoiceItemResponse> items;
}