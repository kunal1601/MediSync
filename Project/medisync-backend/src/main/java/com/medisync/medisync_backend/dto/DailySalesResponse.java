package com.medisync.medisync_backend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailySalesResponse {

    private BigDecimal salesToday;

    private Long billsGenerated;

    private BigDecimal avgBillValue;

}