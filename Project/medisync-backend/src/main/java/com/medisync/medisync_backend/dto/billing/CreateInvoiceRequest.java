package com.medisync.medisync_backend.dto.billing;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class CreateInvoiceRequest {

    private CustomerRequest customer;

    private List<InvoiceItemRequest> items;

    private BigDecimal discountPercentage;

    private String paymentMode;
}