package com.medisync.medisync_backend.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.DashboardStatisticsResponse;
import com.medisync.medisync_backend.dto.PharmacistNameResponse;
import com.medisync.medisync_backend.entity.Pharmacist;
import com.medisync.medisync_backend.repository.PharmacistDashStatisticsRepository;
import com.medisync.medisync_backend.repository.PharmacistRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
@Service
public class PharmacistDashStatisticsService {
	 // Repository used to fetch dashboard statistics from the database
    @Autowired
    private PharmacistDashStatisticsRepository pharmacistDashStatisticsRepository;

    /*
     * Retrieves all statistics required for the Pharmacist Dashboard.
     *
     * Statistics Included:
     * 1. Total Sales (Current Month)
     * 2. Bills Generated Today
     * 3. Low Stock Medicines (Stock < 30)
     * 4. Medicines Expiring Within Next 30 Days
     *
     * Returns:
     * DashboardStatisticsResponse containing all dashboard metrics.
     */
    public DashboardStatisticsResponse getDashboardStatistics() {
    	// Create response DTO
        DashboardStatisticsResponse response = new DashboardStatisticsResponse();
     // Fetch current month's total sales amount
        response.setTotalSales(
                pharmacistDashStatisticsRepository.getCurrentMonthSales());
     // Fetch number of bills generated today
        response.setBillsToday(
                pharmacistDashStatisticsRepository.getBillsToday());
     // Fetch count of medicines having stock less than 30
        response.setLowStockItems(
                pharmacistDashStatisticsRepository.getLowStockItems());
     // Fetch count of medicines expiring within the next 30 days
        response.setExpiringMedicines(
                pharmacistDashStatisticsRepository.getExpiringMedicines());
     // Return populated dashboard statistics
        return response;
    }
    
    @Autowired
    private  PharmacistRepository pharmacistRepository;

    public PharmacistNameResponse getLoggedInPharmacist() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

System.out.println(authentication);
System.out.println(authentication.getAuthorities());
System.out.println(authentication.getName());
        Pharmacist pharmacist =
                pharmacistRepository.findByUsernameOrEmail(username, username)
                        .orElseThrow(() ->
                                new RuntimeException("Pharmacist not found"));

        return PharmacistNameResponse.builder()
             
                .firstName(pharmacist.getFirstName())
                .lastName(pharmacist.getLastName())
                .build();
    }
}