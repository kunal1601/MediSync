package com.medisync.medisync_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.DashboardStatisticsResponse;
import com.medisync.medisync_backend.dto.StockOverviewResponse;
import com.medisync.medisync_backend.dto.TodaysAlertResponse;
import com.medisync.medisync_backend.dto.TopSellingMedicineResponse;
import com.medisync.medisync_backend.service.PharmacistDashStatisticsService;
import com.medisync.medisync_backend.service.StockOverviewServiceImpl;
import com.medisync.medisync_backend.service.TodaysAlertServiceImpl;
import com.medisync.medisync_backend.service.TopSellingMedicineService;

@RestController
@RequestMapping("/api/pharmacist/dashboard")
public class PharmacistDashboardController {

    private final PharmacistDashStatisticsService dashboardStatisticsService;
    private final StockOverviewServiceImpl stockOverviewService;
    private final TopSellingMedicineService topSellingMedicineService;
    private TodaysAlertServiceImpl todaysAlertService;
    public PharmacistDashboardController(
            PharmacistDashStatisticsService dashboardStatisticsService,
            StockOverviewServiceImpl stockOverviewService,
            TopSellingMedicineService topSellingMedicineService,
            TodaysAlertServiceImpl todaysAlertService) {

        this.dashboardStatisticsService = dashboardStatisticsService;
        this.stockOverviewService = stockOverviewService;
        this.topSellingMedicineService = topSellingMedicineService;
        this.todaysAlertService=todaysAlertService;
    }

    // Dashboard Statistics
    @GetMapping("/statistics")
    public ResponseEntity<DashboardStatisticsResponse> getDashboardStatistics() {

        return ResponseEntity.ok(
                dashboardStatisticsService.getDashboardStatistics());
    }

    // Stock Overview Graph
    @GetMapping("/stock-overview")
    public ResponseEntity<List<StockOverviewResponse>> getStockOverview(
            @RequestParam(defaultValue = "drug") String filter) {

        return ResponseEntity.ok(
                stockOverviewService.getStockOverview(filter));
    }

    // Top Selling Medicines
    @GetMapping("/top-selling-medicines")
    public ResponseEntity<List<TopSellingMedicineResponse>> getTopSellingMedicines() {

        return ResponseEntity.ok(
                topSellingMedicineService.getTopSellingMedicines());
    }
    @GetMapping("/alerts")
    public ResponseEntity<List<TodaysAlertResponse>> getTodaysAlerts() {

        return ResponseEntity.ok(
                todaysAlertService.getTodaysAlert());

    }
}