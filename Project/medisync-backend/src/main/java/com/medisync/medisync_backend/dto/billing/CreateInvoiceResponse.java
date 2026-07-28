package com.medisync.medisync_backend.dto.billing;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public class CreateInvoiceResponse {

    private String invoiceNumber;

    private BigDecimal grandTotal;

    private String paymentMode;

    private String customerName;

    private LocalDateTime createdAt;
}
