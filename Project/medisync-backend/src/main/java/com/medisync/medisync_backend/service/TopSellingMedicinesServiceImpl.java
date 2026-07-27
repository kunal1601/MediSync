package com.medisync.medisync_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.TopSellingMedicineResponse;
import com.medisync.medisync_backend.repository.TopSellingMedicineRepository;

@Service
public class TopSellingMedicinesServiceImpl implements TopSellingMedicineService{
	 // Repository used to fetch top-selling medicines from the database
	private final TopSellingMedicineRepository medRepository;
	// Constructor Injection
	public TopSellingMedicinesServiceImpl(TopSellingMedicineRepository medRepository) {
		this.medRepository=medRepository;
	}
	/*
     * Retrieves the Top Selling Medicines based on the total quantity sold.
     *
     * The repository returns the medicine name and total units sold
     * as an Object[] for each record.
     *
     * Returns:
     * List<TopSellingMedicineResponse> containing
     * - Medicine Name
     * - Units Sold
     */
	@Override
	public List<TopSellingMedicineResponse> getTopSellingMedicines() {
		List<Object[]>  result=medRepository.getTopSellingMedicines();
		List<TopSellingMedicineResponse> resp=new ArrayList<>();
		// Convert each database row into TopSellingMedicineResponse DTO
		for(Object[] row:result) {
			resp.add(
					new TopSellingMedicineResponse(
							row[0].toString(),   // Medicine Name
							((Number) row[1]).longValue())); // Total Units Sold

		}
		return resp;
	}
}
