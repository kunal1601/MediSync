package com.medisync.medisync_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockOverviewResponse {

    private String label;
    private Long sales;

    public StockOverviewResponse() {
    }

    public StockOverviewResponse(String label, Long sales) {
        this.label = label;
        this.sales = sales;
    }
		
}
