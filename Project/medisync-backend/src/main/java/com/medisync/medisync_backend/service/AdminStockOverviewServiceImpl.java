package com.medisync.medisync_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.AdminStockOverviewResponse;
import com.medisync.medisync_backend.repository.StockOverviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminStockOverviewServiceImpl
        implements AdminStockOverviewService {

    private final StockOverviewRepository repository;

    // Monthly Target
    private static final double MONTHLY_TARGET = 5000;

    @Override
    public List<AdminStockOverviewResponse> getStockOverview(String filter) {

        List<Object[]> result;

        switch (filter.toLowerCase()) {

            case "drug":
                result = repository.getRevenueByDrugType();
                break;

            case "company":
                result = repository.getRevenueByCompany();
                break;

            case "mostsold":
                result = repository.getRevenueByMedicine();
                break;

            case "year":
                result = repository.getRevenueByYear();
                break;

            default:
                throw new IllegalArgumentException("Invalid Filter");
        }

        List<AdminStockOverviewResponse> response = new ArrayList<>();

        for (Object[] row : result) {

            String label = row[0].toString();

            Double sales = ((Number) row[1]).doubleValue();

            double target;

            if (filter.equalsIgnoreCase("year")) {

                target = MONTHLY_TARGET * 12;

            } else {

                target = MONTHLY_TARGET;
            }

            double achievement = (sales / target) * 100;

            response.add(

                    new AdminStockOverviewResponse(

                            label,

                            Math.round(sales * 100.0) / 100.0,

                            target,

                            Math.round(achievement * 100.0) / 100.0
                    )
            );
        }

        return response;
    }
}