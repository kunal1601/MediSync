package com.medisync.medisync_backend.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medisync.medisync_backend.dto.InventoryLossRequest;
import com.medisync.medisync_backend.dto.InventoryLossResponse;
import com.medisync.medisync_backend.entity.InventoryLoss;
import com.medisync.medisync_backend.entity.LossType;
import com.medisync.medisync_backend.entity.MedicineStock;
import com.medisync.medisync_backend.entity.Pharmacist;
import com.medisync.medisync_backend.repository.InventoryLossRepository;
import com.medisync.medisync_backend.repository.MedicineStockRepository;
import com.medisync.medisync_backend.repository.PharmacistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryLossServiceImpl {

    private final InventoryLossRepository inventoryLossRepository;
    private final MedicineStockRepository medicineStockRepository;
    private final PharmacistRepository pharmacistRepository;

    //Inventory Loss Repo
    public InventoryLossResponse reportLoss(InventoryLossRequest request) {

        // Fetch selected stock
        MedicineStock stock = medicineStockRepository.findById(request.getStockId())
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        // Validate quantity
        if (request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        if (request.getQuantity() > stock.getStockQuantity()) {
            throw new RuntimeException("Insufficient stock available");
        }

        // Get logged in pharmacist
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        System.out.println(authentication);
    

        String identifier = authentication.getName();

        Pharmacist pharmacist = pharmacistRepository
                .findByUsernameOrEmail(identifier, identifier)
                .orElseThrow(() -> new RuntimeException("Pharmacist not found"));
        // Calculate loss amount
        BigDecimal lossAmount = stock.getPurchasePrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()));

        // Create Inventory Loss object
        InventoryLoss loss = new InventoryLoss();

        loss.setStock(stock);
        loss.setMedicine(stock.getMedicine());
        loss.setPharmacist(pharmacist);
        loss.setQuantity(request.getQuantity());
        loss.setLossType(LossType.valueOf(request.getLossType().toUpperCase()));
        loss.setReason(request.getReason());
        loss.setLossAmount(lossAmount);

        // Reduce stock
        stock.setStockQuantity(
                stock.getStockQuantity() - request.getQuantity());

        medicineStockRepository.save(stock);

        // Save loss
        InventoryLoss savedLoss = inventoryLossRepository.save(loss);

        // Return Response
        return InventoryLossResponse.builder()
                .lossId(savedLoss.getLossId())
                .medicineName(savedLoss.getMedicine().getName())
                .batchNumber(savedLoss.getStock().getBatchNumber())
                .quantity(savedLoss.getQuantity())
                .lossType(savedLoss.getLossType().name())
                .reason(savedLoss.getReason())
                .lossAmount(savedLoss.getLossAmount())
                .reportedBy(
                        savedLoss.getPharmacist().getFirstName() + " "
                                + savedLoss.getPharmacist().getLastName())
                .createdAt(savedLoss.getCreatedAt())
                .build();
    }

    //Get all Inventory Loss
    @Transactional(readOnly = true)
    public List<InventoryLossResponse> getAllLosses() {

        return inventoryLossRepository.findAll()
                .stream()
                .map(loss -> InventoryLossResponse.builder()
                        .lossId(loss.getLossId())
                        .medicineName(loss.getMedicine().getName())
                        .batchNumber(loss.getStock().getBatchNumber())
                        .quantity(loss.getQuantity())
                        .lossType(loss.getLossType().name())
                        .reason(loss.getReason())
                        .lossAmount(loss.getLossAmount())
                        .reportedBy(
                                loss.getPharmacist().getFirstName() + " "
                                        + loss.getPharmacist().getLastName())
                        .createdAt(loss.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
}