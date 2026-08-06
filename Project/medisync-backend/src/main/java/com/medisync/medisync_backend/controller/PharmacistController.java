package com.medisync.medisync_backend.controller;

import com.medisync.medisync_backend.dto.PharmacistRegistrationDTO;
import com.medisync.medisync_backend.entity.Pharmacist;
import com.medisync.medisync_backend.service.PharmacistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pharmacists")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") //  Standard Vite dev server port (or http://localhost:3000)
public class PharmacistController {

    private final PharmacistService pharmacistService;

    /*
     *  Register new Pharmacist (Hashes password with SHA-256 & encrypts sensitive fields)
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerPharmacist(@RequestBody PharmacistRegistrationDTO dto) {
        try {
            Pharmacist savedPharmacist = pharmacistService.registerPharmacist(dto);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Pharmacist registered successfully!");
            response.put("id", savedPharmacist.getId());
            response.put("username", savedPharmacist.getUsername());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            // Catches validation errors (e.g., Duplicate Username / Email)
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 🌟 Get all Pharmacists (Decrypts sensitive fields automatically for Admin view)
     */
    @GetMapping
    public ResponseEntity<List<Pharmacist>> getAllPharmacists() {
        List<Pharmacist> pharmacists = pharmacistService.getAllPharmacists(); // 🌟 Updated method name
        return ResponseEntity.ok(pharmacists);
    }

    /**
     * 🌟 Optional: Get Pharmacist by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getPharmacistById(@PathVariable Long id) {
        return pharmacistService.getPharmacistById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * 🌟 Optional: Update Working Shift
     */
    @PatchMapping("/{id}/shift")
    public ResponseEntity<?> updateShift(@PathVariable Long id, @RequestParam String shift) {
        try {
            Pharmacist updated = pharmacistService.updateShift(id, shift);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}