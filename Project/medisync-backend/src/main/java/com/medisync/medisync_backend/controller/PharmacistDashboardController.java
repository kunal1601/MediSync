package com.medisync.medisync_backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.DailySalesResponse;
import com.medisync.medisync_backend.dto.DashboardStatisticsResponse;
import com.medisync.medisync_backend.dto.StockOverviewResponse;
import com.medisync.medisync_backend.dto.TodaysAlertResponse;
import com.medisync.medisync_backend.dto.TopSellingMedicineResponse;
import com.medisync.medisync_backend.service.DailySalesService;
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
    private final TodaysAlertServiceImpl todaysAlertService;
    private final DailySalesService dailySalesService;
    public PharmacistDashboardController(
            PharmacistDashStatisticsService dashboardStatisticsService,
            StockOverviewServiceImpl stockOverviewService,
            TopSellingMedicineService topSellingMedicineService,
            TodaysAlertServiceImpl todaysAlertService,
            DailySalesService dailySalesService) {

        this.dashboardStatisticsService = dashboardStatisticsService;
        this.stockOverviewService = stockOverviewService;
        this.topSellingMedicineService = topSellingMedicineService;
        this.todaysAlertService=todaysAlertService;
        this.dailySalesService=dailySalesService;
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
    //Todays Alert
    @GetMapping("/alerts")
    public ResponseEntity<List<TodaysAlertResponse>> getTodaysAlerts() {

        return ResponseEntity.ok(
                todaysAlertService.getTodaysAlert());

    }
    //Calender
    @GetMapping("/daily-sales")
    public ResponseEntity<DailySalesResponse> getDailySales(
            @RequestParam LocalDate date){

        return ResponseEntity.ok(
                dailySalesService.getDailySales(date));
    }
}