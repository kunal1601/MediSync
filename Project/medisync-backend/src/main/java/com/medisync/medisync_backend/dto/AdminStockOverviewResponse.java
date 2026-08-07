package com.medisync.medisync_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminStockOverviewResponse {

    private String label;

    private Double sales;	

    private Double target;

    private Double achievement;
}