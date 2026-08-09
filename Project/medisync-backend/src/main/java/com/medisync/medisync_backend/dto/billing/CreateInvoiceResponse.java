package com.medisync.medisync_backend.dto.billing;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateInvoiceResponse {

    private String invoiceNumber;

    private BigDecimal grandTotal;

    private String paymentMode;

    private String customerName;

    private LocalDateTime createdAt;
}
