package com.medisync.medisync_backend.controller;

import java.util.List;
import com.medisync.medisync_backend.service.PharmacistOnBoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.IncomeGrowthResponse;
import com.medisync.medisync_backend.dto.PharmacistCardResponse;
import com.medisync.medisync_backend.dto.PharmacistDetailsResponse;
import com.medisync.medisync_backend.dto.ProfitLossResponsedto;
import com.medisync.medisync_backend.service.AdminAnalyticsService;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final PharmacistOnBoardService pharmacistOnBoardService;
	
	private final AdminAnalyticsService adminAnalytics;
	
	//Constructor Injection
	public AdminDashboardController(AdminAnalyticsService adminAnalytics, PharmacistOnBoardService pharmacistOnBoardService) {
		this.adminAnalytics=adminAnalytics;
		this.pharmacistOnBoardService = pharmacistOnBoardService;
	
	}
	
	//Income Growth Graph
	@GetMapping("/income-growth")
	public ResponseEntity<List<IncomeGrowthResponse>> getIncomeGrowth(@RequestParam(defaultValue="Weekly") String period){
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
}
