package com.medisync.medisync_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.TopSellingMedicineResponse;
import com.medisync.medisync_backend.service.TopSellingMedicineService;

@RestController
@RequestMapping("/api/top-selling-medicine")
public class TopSellingMedicineController {

	private final TopSellingMedicineService medService;
	public TopSellingMedicineController(TopSellingMedicineService medService) {
		this.medService=medService;
	}
	
	@GetMapping
	public ResponseEntity<List<TopSellingMedicineResponse>> getTopSellingMedicines(){
		return ResponseEntity.ok(medService.getTopSellingMedicines());
	}
}
