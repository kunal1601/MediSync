package com.medisync.medisync_backend.service;

import com.medisync.medisync_backend.entity.Pharmacist;
import com.medisync.medisync_backend.repository.PharmacistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PharmacistService {

    private final PharmacistRepository pharmacistRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<Pharmacist> getAllPharmacists() {
        return pharmacistRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Pharmacist> getPharmacistsByStatus(String employmentStatus) {
        return pharmacistRepository.findByEmploymentStatus(employmentStatus);
    }

    @Transactional(readOnly = true)
    public Optional<Pharmacist> getPharmacistById(Long id) {
        return pharmacistRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Pharmacist> getPharmacistByUsername(String username) {
        return pharmacistRepository.findByUsername(username);
    }

    // 🌟 ADDED: Lookup by email
    @Transactional(readOnly = true)
    public Optional<Pharmacist> getPharmacistByEmail(String email) {
        return pharmacistRepository.findByEmail(email);
    }

    // 🌟 ADDED: Flexible lookup by username OR email
    @Transactional(readOnly = true)
    public Optional<Pharmacist> getPharmacistByUsernameOrEmail(String identifier) {
        return pharmacistRepository.findByUsernameOrEmail(identifier, identifier);
    }

    @Transactional
    public Pharmacist registerPharmacist(Pharmacist pharmacist) {
        // 🌟 UPDATED: Validate uniqueness for both username and email before saving
        if (pharmacistRepository.findByUsername(pharmacist.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists: " + pharmacist.getUsername());
        }
        if (pharmacist.getEmail() != null && pharmacistRepository.findByEmail(pharmacist.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists: " + pharmacist.getEmail());
        }

        // Hash system password using Sha256PasswordEncoder
        pharmacist.setPassword(passwordEncoder.encode(pharmacist.getPassword()));
        
        // Default employment status on creation
        if (pharmacist.getEmploymentStatus() == null) {
            pharmacist.setEmploymentStatus("ACTIVE");
        }
        
        return pharmacistRepository.save(pharmacist);
    }

    @Transactional
    public Pharmacist updateShift(Long id, String newShift) {
        Pharmacist pharmacist = pharmacistRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pharmacist not found with ID: " + id));
        pharmacist.setWorkingShift(newShift);
        return pharmacistRepository.save(pharmacist);
    }

    /**
     * Updates employment status when a pharmacist resigns, is terminated, or flagged.
     */
    @Transactional
    public Pharmacist updateEmploymentStatus(Long id, String status, String reason) {
        Pharmacist pharmacist = pharmacistRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pharmacist not found with ID: " + id));

        pharmacist.setEmploymentStatus(status);
        
        if (!"ACTIVE".equalsIgnoreCase(status)) {
            pharmacist.setDateOfExit(LocalDate.now());
            pharmacist.setFlagReason(reason);
        } else {
            pharmacist.setDateOfExit(null);
            pharmacist.setFlagReason(null);
        }

        return pharmacistRepository.save(pharmacist);
    }
}