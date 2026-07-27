package com.medisync.medisync_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.IncomeGrowthResponse;
import com.medisync.medisync_backend.repository.IncomeGrowthRepository;

@Service
public class AdminAnalyticsService {
	// Repository dependency for fetching income growth data
	private final IncomeGrowthRepository incomeGrowthRepo;
	//Constructor Injection
	public AdminAnalyticsService(IncomeGrowthRepository incomeGrowthRepo) {
		this.incomeGrowthRepo=incomeGrowthRepo;
	}
	// Repository dependency for fetching income growth data
	public List<IncomeGrowthResponse> getIncomeGrowth(String period){
		
		List<IncomeGrowthResponse> response=new ArrayList<>();
		List<Object[]> result;
		// Call the appropriate repository method based on the selected period
		switch(period) {
		case "weekly": 
			result=incomeGrowthRepo.getWeeklyIncome();
			break;
		case "monthly":
			result=incomeGrowthRepo.getMonthlyIncome();
			break;
		case "yearly":
			result=incomeGrowthRepo.getYearlyIncome();
			break;
		default:
			throw new IllegalArgumentException("Invalid Period");
		}
		// Convert query result into DTO objects
		for(Object[] row:result) {
			response.add(new IncomeGrowthResponse(
					row[0].toString(),
					((Number)row[1]).doubleValue()));
		}
		return response;
	}
}
