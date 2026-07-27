package com.medisync.medisync_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.IncomeGrowthResponse;
import com.medisync.medisync_backend.service.AdminAnalyticsService;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {
	
	private final AdminAnalyticsService adminAnalytics;
	//Constructor Injection
	public AdminDashboardController(AdminAnalyticsService adminAnalytics) {
		this.adminAnalytics=adminAnalytics;
	}
	//Income Growth Graph
	@GetMapping("/income-growth")
	public ResponseEntity<List<IncomeGrowthResponse>> getIncomeGrowth(@RequestParam(defaultValue="Weekly") String period){
		return ResponseEntity.ok(adminAnalytics.getIncomeGrowth(period));
	}
}
