package com.medisync.medisync_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.TodaysAlertResponse;
import com.medisync.medisync_backend.entity.MedicineStock;
import com.medisync.medisync_backend.repository.TodaysAlertRepository;

@Service
public class TodaysAlertServiceImpl {

	@Autowired
	private TodaysAlertRepository todaysAlertRepository;
	 /*
     * Fetches today's alerts for the pharmacist dashboard.
     *
     * Alert Types:
     * 1. Out Of Stock  -> High Priority
     * 2. Near Expiry   -> Medium Priority
     * 3. Expired       -> High Priority
     */
		
	public List<TodaysAlertResponse> getTodaysAlert(){
		List<TodaysAlertResponse> response=new ArrayList<>();
		List<MedicineStock> outOfStock=todaysAlertRepository.getOutOfStockMedicines();
		
		for(MedicineStock stock:outOfStock) {
			response.add(
					new TodaysAlertResponse(
							stock.getMedicine().getName(),
							"Out Of Stock",
							"High"));
		}
		// Fetch medicines nearing expiry
        List<MedicineStock> nearExpiry =
                todaysAlertRepository.getNearExpiryMedicines();

        for (MedicineStock stock : nearExpiry) {

            response.add(
                    new TodaysAlertResponse(
                            stock.getMedicine().getName(),
                            "Near Expiry",
                            "Medium"
                    )
            );
        }

        // Fetch expired medicines
        List<MedicineStock> expired =
                todaysAlertRepository.getExpiredMedicines();

        for (MedicineStock stock : expired) {

            response.add(
                    new TodaysAlertResponse(
                            stock.getMedicine().getName(),
                            "Expired",
                            "High"
                    )
            );
        }

        return response;
	}
	
}
