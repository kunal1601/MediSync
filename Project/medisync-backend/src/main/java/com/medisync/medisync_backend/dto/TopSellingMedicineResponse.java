package com.medisync.medisync_backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopSellingMedicineResponse {
	private String medicineName;

    private Long unitsSold;

    public TopSellingMedicineResponse() {
    }

    public TopSellingMedicineResponse(String medicineName, Long unitsSold) {
        this.medicineName = medicineName;
        this.unitsSold = unitsSold;
    }

}
