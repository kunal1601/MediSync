package com.medisync.medisync_backend.controller;

import com.medisync.medisync_backend.entity.Pharmacist;
import com.medisync.medisync_backend.service.PharmacistService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final PharmacistService pharmacistService;

    // Get all pharmacists
    @GetMapping("/pharmacists")
    public ResponseEntity<List<Pharmacist>> getAllPharmacists() {
        return ResponseEntity.ok(pharmacistService.getAllPharmacists());
    }

    // Get pharmacists by active/left status
    @GetMapping("/pharmacists/status/{status}")
    public ResponseEntity<List<Pharmacist>> getPharmacistsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(pharmacistService.getPharmacistsByStatus(status));
    }

    // Onboard a new Pharmacist
    @PostMapping("/pharmacist/register")
    public ResponseEntity<Pharmacist> registerPharmacist(@RequestBody Pharmacist pharmacist) {
        return ResponseEntity.ok(pharmacistService.registerPharmacist(pharmacist));
    }

    // Update Shift
    @PutMapping("/pharmacist/{id}/shift")
    public ResponseEntity<Pharmacist> updateShift(
            @PathVariable Long id, 
            @RequestParam String shift) {
        return ResponseEntity.ok(pharmacistService.updateShift(id, shift));
    }

    // Offboard / Flag Pharmacist
    @PutMapping("/pharmacist/{id}/status")
    public ResponseEntity<Pharmacist> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(
            pharmacistService.updateEmploymentStatus(id, request.getStatus(), request.getReason())
        );
    }

    @Data
    public static class StatusUpdateRequest {
        private String status; // 'RESIGNED', 'TERMINATED', 'FLAGGED'
        private String reason;
    }
}