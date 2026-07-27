package com.medisync.medisync_backend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatisticsResponse {

    private BigDecimal totalSales;

    private Long billsToday;

    private Long lowStockItems;

    private Long expiringMedicines;
}