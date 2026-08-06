package com.medisync.medisync_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medisync.medisync_backend.dto.AlertRequestDto;
import com.medisync.medisync_backend.dto.AlertResponseDto;
import com.medisync.medisync_backend.service.AlertService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AlertController {

    private final AlertService alertService;

    /**
     * Pharmacist raises a new request
     */
    @PostMapping("/request")
    public ResponseEntity<AlertResponseDto> raiseNewRequest(
            @RequestBody AlertRequestDto requestDto) {

        AlertResponseDto response = alertService.raiseNewRequest(requestDto);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get all system generated alerts
     */
    @GetMapping("/system")
    public ResponseEntity<List<AlertResponseDto>> getSystemGeneratedAlerts() {

        return ResponseEntity.ok(alertService.getSystemGeneratedAlerts());
    }

    /**
     * Get requests already sent to admin
     */
    @GetMapping("/requests")
    public ResponseEntity<List<AlertResponseDto>> getRequestsSentToAdmin() {

        return ResponseEntity.ok(alertService.getRequestsSentToAdmin());
    }

    /**
     * Send a system generated alert to admin
     */
    @PutMapping("/{alertId}/send")
    public ResponseEntity<AlertResponseDto> sendAlertToAdmin(
            @PathVariable Long alertId) {

        return ResponseEntity.ok(alertService.sendAlertToAdmin(alertId));
    }

    /**
     * Admin - Get all pending requests
     */
    @GetMapping("/pending")
    public ResponseEntity<List<AlertResponseDto>> getPendingRequests() {

        return ResponseEntity.ok(alertService.getPendingRequests());
    }
    
    @GetMapping("/manual-requests")
    public ResponseEntity<List<AlertResponseDto>> getManualRequests() {
        return ResponseEntity.ok(alertService.getManualRequests());
    }
    

    /**
     * Admin approves a request
     */
    @PutMapping("/{alertId}/approve")
    public ResponseEntity<AlertResponseDto> approveRequest(
            @PathVariable Long alertId) {

        return ResponseEntity.ok(alertService.approveRequest(alertId));
    }

    /**
     * Admin rejects a request
     */
    @PutMapping("/{alertId}/reject")
    public ResponseEntity<AlertResponseDto> rejectRequest(
            @PathVariable Long alertId) {

        return ResponseEntity.ok(alertService.rejectRequest(alertId));
    }
    
    @PostMapping("/generate")
    public ResponseEntity<String> generateSystemAlerts() {

        alertService.generateSystemAlerts();

        return ResponseEntity.ok("System alerts generated successfully.");
    }
}