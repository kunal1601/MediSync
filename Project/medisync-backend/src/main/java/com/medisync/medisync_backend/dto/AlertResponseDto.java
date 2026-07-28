package com.medisync.medisync_backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.medisync.medisync_backend.entity.AlertStatus;
import com.medisync.medisync_backend.entity.AlertType;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AlertResponseDto {

    private Long alertId;

    private Integer medicineId;

    private String medicineName;

    private AlertType alertType;

    private String description;

    private AlertStatus status;

    private LocalDateTime createdAt;
    
    private Long stockId;

    private String batchNumber;

    private LocalDate expiryDate;
}