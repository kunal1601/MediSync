package com.medisync.medisync_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.TopSellingMedicineResponse;
import com.medisync.medisync_backend.repository.TopSellingMedicineRepository;

@Service
public class TopSellingMedicinesServiceImpl implements TopSellingMedicineService{

	private final TopSellingMedicineRepository medRepository;
	public TopSellingMedicinesServiceImpl(TopSellingMedicineRepository medRepository) {
		this.medRepository=medRepository;
	}
	@Override
	public List<TopSellingMedicineResponse> getTopSellingMedicines() {
		List<Object[]>  result=medRepository.getTopSellingMedicines();
		List<TopSellingMedicineResponse> resp=new ArrayList<>();
		for(Object[] row:result) {
			resp.add(
					new TopSellingMedicineResponse(
							row[0].toString(),
							((Number) row[1]).longValue()));
		}
		return resp;
	}
}
