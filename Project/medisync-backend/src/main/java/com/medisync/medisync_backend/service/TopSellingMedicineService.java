package com.medisync.medisync_backend.service;

import java.util.List;

import com.medisync.medisync_backend.dto.TopSellingMedicineResponse;

public interface TopSellingMedicineService {
	List<TopSellingMedicineResponse> getTopSellingMedicines();
}
