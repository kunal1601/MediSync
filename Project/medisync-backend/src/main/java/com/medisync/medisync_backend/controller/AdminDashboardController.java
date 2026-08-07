package com.medisync.medisync_backend.controller;

import java.time.LocalDate;
import java.util.List;
import com.medisync.medisync_backend.service.PharmacistOnBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.AdminStockOverviewResponse;
import com.medisync.medisync_backend.dto.IncomeGrowthResponse;
import com.medisync.medisync_backend.dto.PharmacistCardResponse;
import com.medisync.medisync_backend.dto.PharmacistDetailsResponse;
import com.medisync.medisync_backend.dto.PharmacistLeaveResponse;
import com.medisync.medisync_backend.dto.ProfitLossResponsedto;
import com.medisync.medisync_backend.service.AdminAnalyticsService;
import com.medisync.medisync_backend.service.AdminStockOverviewService;
import com.medisync.medisync_backend.service.PharmacistLeaveService;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final PharmacistOnBoardService pharmacistOnBoardService;
	private final PharmacistLeaveService pharmacistLeaveService;
	private final AdminAnalyticsService adminAnalytics;
	 private final AdminStockOverviewService adminStockOverviewService;
	//Constructor Injection
	public AdminDashboardController(AdminAnalyticsService adminAnalytics, PharmacistOnBoardService pharmacistOnBoardService
			,PharmacistLeaveService pharmacistLeaveService,AdminStockOverviewService adminStockOverviewService) {
		this.adminAnalytics=adminAnalytics;
		this.pharmacistOnBoardService = pharmacistOnBoardService;
		this.pharmacistLeaveService=pharmacistLeaveService;
		this.adminStockOverviewService=adminStockOverviewService;
	}
	
	//Income Growth Graph
	@GetMapping("/income-growth")
	public ResponseEntity<List<IncomeGrowthResponse>> getIncomeGrowth(@RequestParam(defaultValue="weekly") String period){
		return ResponseEntity.ok(adminAnalytics.getIncomeGrowth(period));
	}
	
	//ProfitLoss Graph
	@GetMapping("/profit-loss")
    public ResponseEntity<ProfitLossResponsedto> getProfitLoss() {
	     return ResponseEntity.ok(adminAnalytics.getProfitLoss());
	}
	
	//Get Pharmacist By id
	 @GetMapping("/pharmacist/{id}")
	 public PharmacistDetailsResponse getPharmacistDetails(@PathVariable Long id) {
	     return pharmacistOnBoardService.getPharmacistDetails(id);
	 }
	 
	 //get Active Pharmacist
	 @GetMapping("/pharmacists")
	 public List<PharmacistCardResponse> getAllPharmacists() {

	     return pharmacistOnBoardService.getAllPharmacists();

	 }
	 
	 //Calender Leaves
	@GetMapping("/calendar/leaves")
	public ResponseEntity<List<PharmacistLeaveResponse>> getLeaves(
	        @RequestParam LocalDate date) {
	
	    return ResponseEntity.ok(
	            pharmacistLeaveService.getLeavesByDate(date)
	    );
	}
	//Leave Dates Calender
	@GetMapping("/calendar/leave-dates")
	public ResponseEntity<List<LocalDate>> getLeaveDates(
	        @RequestParam int year,
	        @RequestParam int month){

	    return ResponseEntity.ok(
	            pharmacistLeaveService.getLeaveDates(year,month));
	}
	

	@GetMapping("/stock-overview")
	public ResponseEntity<List<AdminStockOverviewResponse>> getStockOverview(
	        @RequestParam(defaultValue = "drug") String filter) {

	      return ResponseEntity.ok(
	            adminStockOverviewService.getStockOverview(filter));
	}
}
