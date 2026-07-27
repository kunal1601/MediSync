package com.medisync.medisync_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.StockOverviewResponse;
import com.medisync.medisync_backend.repository.StockOverviewRepository;
@Service
public class StockOverviewServiceImpl implements StockOverviewService{
	 // Repository used to fetch stock overview data from the database
	  private final StockOverviewRepository stockOverviewRepository;
	// Constructor Injection
	    public StockOverviewServiceImpl(StockOverviewRepository stockOverviewRepository) {
	        this.stockOverviewRepository = stockOverviewRepository;
	    }
	    
	    /*
	     * Retrieves stock overview data based on the selected filter.
	     *
	     * Supported Filters:
	     * 1. drug      -> Sales grouped by Medicine Category
	     * 2. company   -> Sales grouped by Manufacturer
	     * 3. year      -> Sales grouped by Invoice Year
	     * 4. mostsold  -> Most Sold Medicines
	     *
	     * Returns:
	     * List<StockOverviewResponse> containing label and sales count
	     * for rendering the Stock Overview graph.
	     */
	@Override
	public List<StockOverviewResponse> getStockOverview(String filter) {
		
		 List<Object[]> result;
		  // Select the appropriate repository query based on filter
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
	             // Throw exception if an unsupported filter is received

	            default:
	                throw new IllegalArgumentException("Invalid filter : " + filter);
	        }

	        List<StockOverviewResponse> response = new ArrayList<>();
	        // Convert each database row into StockOverviewResponse DTO
	        for (Object[] row : result) {

	            String label = row[0].toString();
	            Long sales = ((Number) row[1]).longValue();

	            response.add(new StockOverviewResponse(label, sales));
	        }

	        return response;
	}

}
