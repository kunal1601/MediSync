package com.medisync.medisync_backend.controller;

import java.util.List;
import com.medisync.medisync_backend.dto.billing.InvoiceHistoryResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.billing.BillingMedicineResponse;
import com.medisync.medisync_backend.dto.billing.CreateInvoiceRequest;
import com.medisync.medisync_backend.dto.billing.CreateInvoiceResponse;
import com.medisync.medisync_backend.service.BillingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    @GetMapping("/medicines")
    public ResponseEntity<List<BillingMedicineResponse>> getMedicines() {
        return ResponseEntity.ok(billingService.getMedicinesForBilling());
    }

    @PostMapping("/invoice")
    public ResponseEntity<CreateInvoiceResponse> createInvoice(
            @RequestBody CreateInvoiceRequest request) {

        return ResponseEntity.ok(
                billingService.createInvoice(request)
        );
    }
    
    @GetMapping("/invoices")
    public ResponseEntity<List<InvoiceHistoryResponse>> getInvoiceHistory() {

        return ResponseEntity.ok(
                billingService.getInvoiceHistory()
        );
    }
}