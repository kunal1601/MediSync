package com.medisync.medisync_backend.service;

import java.util.List;

import com.medisync.medisync_backend.dto.StockOverviewResponse;

public interface StockOverviewService {
	
	List<StockOverviewResponse> getStockOverview(String filter);
}
