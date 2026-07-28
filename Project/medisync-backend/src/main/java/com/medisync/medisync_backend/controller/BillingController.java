package com.medisync.medisync_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.billing.BillingMedicineResponse;
import com.medisync.medisync_backend.service.BillingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    @GetMapping("/medicines")
    public ResponseEntity<List<BillingMedicineResponse>> getMedicines() {

        return ResponseEntity.ok(
                billingService.getMedicinesForBilling()
        );
    }
}
