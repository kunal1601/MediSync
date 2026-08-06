package com.medisync.medisync_backend.dto.billing;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceHistoryResponse {

    private String invoiceNumber;

    private String customerName;

    private LocalDateTime createdAt;

    private String paymentMode;

    private BigDecimal grandTotal;
}