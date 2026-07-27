package com.medisync.medisync_backend.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.DailySalesResponse;
import com.medisync.medisync_backend.repository.DailySalesRepository;

@Service
public class DailySalesService {
	
	@Autowired
	private DailySalesRepository dailySalesRepo;
	
	public DailySalesResponse getDailySales(LocalDate date) {
		DailySalesResponse response=new DailySalesResponse();
		
		response.setSalesToday(dailySalesRepo.getSalesToday(date));
		response.setBillsGenerated(dailySalesRepo.getBillsGenerated(date));
		response.setAvgBillValue(dailySalesRepo.getAverageBillValue(date));
		
		return response;
	}
}
