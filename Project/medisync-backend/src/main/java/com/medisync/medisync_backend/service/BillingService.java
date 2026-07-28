package com.medisync.medisync_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medisync.medisync_backend.dto.billing.BillingMedicineResponse;
import com.medisync.medisync_backend.entity.MedicineStock;
import com.medisync.medisync_backend.repository.MedicineStockRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BillingService {

    private final MedicineStockRepository medicineStockRepository;

    public List<BillingMedicineResponse> getMedicinesForBilling() {

    	List<MedicineStock> stocks =
    	        medicineStockRepository.findAvailableStocksForBilling();

        return stocks.stream()
                .map(this::convertToBillingResponse)
                .toList();
    }

    private BillingMedicineResponse convertToBillingResponse(MedicineStock stock) {

        return BillingMedicineResponse.builder()
                .stockId(stock.getStockId())
                .itemCode(stock.getMedicine().getItemCode())
                .medicineName(stock.getMedicine().getName())
                .manufacturer(stock.getMedicine().getManufacturer())
                .category(stock.getMedicine().getCategory())
                .batchNumber(stock.getBatchNumber())
                .sellingPrice(stock.getSellingPrice())
                .availableStock(stock.getStockQuantity())
                .build();
    }
}