package com.medisync.medisync_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class InventoryLossResponse {

    private Long lossId;

    private String medicineName;

    private String batchNumber;

    private Integer quantity;

    private String lossType;

    private String reason;

    private BigDecimal lossAmount;

    private String reportedBy;

    private LocalDateTime createdAt;

}