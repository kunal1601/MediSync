package com.medisync.medisync_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.StockOverviewResponse;
import com.medisync.medisync_backend.service.StockOverviewServiceImpl;

@RestController
@RequestMapping("/api/stock-overview")

public class StockOverviewController {
	private final StockOverviewServiceImpl stockOverviewService;

    public StockOverviewController(StockOverviewServiceImpl stockOverviewService) {
        this.stockOverviewService = stockOverviewService;
    }

    @GetMapping
    public ResponseEntity<List<StockOverviewResponse>> getStockOverview(
            @RequestParam(defaultValue = "drug") String filter) {

        List<StockOverviewResponse> response =
                stockOverviewService.getStockOverview(filter);

        return ResponseEntity.ok(response);
    }
}
