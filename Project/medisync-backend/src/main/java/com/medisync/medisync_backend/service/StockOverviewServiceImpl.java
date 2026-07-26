package com.medisync.medisync_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.StockOverviewResponse;
import com.medisync.medisync_backend.repository.StockOverviewRepository;
@Service
public class StockOverviewServiceImpl implements StockOverviewService{

	  private final StockOverviewRepository stockOverviewRepository;

	    public StockOverviewServiceImpl(StockOverviewRepository stockOverviewRepository) {
	        this.stockOverviewRepository = stockOverviewRepository;
	    }
	    
	@Override
	public List<StockOverviewResponse> getStockOverview(String filter) {
		// TODO Auto-generated method stub
		 List<Object[]> result;

	        switch (filter.toLowerCase()) {

	            case "drug":
	                result = stockOverviewRepository.getSalesByDrugType();
	                break;

	            case "company":
	                result = stockOverviewRepository.getSalesByCompanyName();
	                break;

	            case "year":
	                result = stockOverviewRepository.getSalesByYear();
	                break;

	            case "mostsold":
	                result = stockOverviewRepository.getMostSoldMedicines();
	                break;

	            default:
	                throw new IllegalArgumentException("Invalid filter : " + filter);
	        }

	        List<StockOverviewResponse> response = new ArrayList<>();

	        for (Object[] row : result) {

	            String label = row[0].toString();
	            Long sales = ((Number) row[1]).longValue();

	            response.add(new StockOverviewResponse(label, sales));
	        }

	        return response;
	}

}
