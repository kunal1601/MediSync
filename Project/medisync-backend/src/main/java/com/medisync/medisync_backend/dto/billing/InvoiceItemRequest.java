package com.medisync.medisync_backend.dto.billing;

import lombok.Data;

@Data
public class InvoiceItemRequest {

    private Long stockId;

    private Integer quantity;
}