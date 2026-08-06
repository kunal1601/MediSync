package com.medisync.medisync_backend.dto;


import lombok.Data;

@Data
public class InventoryLossRequest {

    private Integer stockId;

    private Integer quantity;

    private String lossType;

    private String reason;
}