package com.medisync.medisync_backend.service;

import com.medisync.medisync_backend.dto.PharmacistRegistrationDTO;
import com.medisync.medisync_backend.entity.Pharmacist;
import com.medisync.medisync_backend.repository.PharmacistRepository;
import com.medisync.medisync_backend.security.AesEncryptionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PharmacistService {

    private final PharmacistRepository pharmacistRepository;
    private final PasswordEncoder passwordEncoder;
    private final AesEncryptionUtil aesEncryptionUtil;

    /**
     * Helper method to decrypt sensitive fields (Aadhaar ID, License) for Admin view
     */
    private Pharmacist decryptPharmacistForView(Pharmacist pharmacist) {
        if (pharmacist == null) return null;
        
        // Decrypt AES-256 fields
        pharmacist.setLicenseNumber(aesEncryptionUtil.decrypt(pharmacist.getLicenseNumber()));
        pharmacist.setAadharNumber(aesEncryptionUtil.decrypt(pharmacist.getAadharNumber()));
        
        return pharmacist;
    }

    @Transactional(readOnly = true)
    public List<Pharmacist> getAllPharmacists() {
        return pharmacistRepository.findAll()
                .stream()
                .map(this::decryptPharmacistForView)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Pharmacist> getPharmacistsByStatus(String employmentStatus) {
        return pharmacistRepository.findByEmploymentStatus(employmentStatus)
                .stream()
                .map(this::decryptPharmacistForView)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<Pharmacist> getPharmacistById(Long id) {
        return pharmacistRepository.findById(id).map(this::decryptPharmacistForView);
    }

    @Transactional(readOnly = true)
    public Optional<Pharmacist> getPharmacistByUsername(String username) {
        return pharmacistRepository.findByUsername(username).map(this::decryptPharmacistForView);
    }

    @Transactional(readOnly = true)
    public Optional<Pharmacist> getPharmacistByEmail(String email) {
        return pharmacistRepository.findByEmail(email).map(this::decryptPharmacistForView);
    }

    @Transactional(readOnly = true)
    public Optional<Pharmacist> getPharmacistByUsernameOrEmail(String identifier) {
        return pharmacistRepository.findByUsernameOrEmail(identifier, identifier)
                .map(this::decryptPharmacistForView);
    }

    /**
     * Register Pharmacist using DTO (From Frontend Form)
     */
    @Transactional
    public Pharmacist registerPharmacist(PharmacistRegistrationDTO dto) {
        Pharmacist pharmacist = new Pharmacist();
        
        // 🌟 Safe name splitting with fallback
        String fullName = (dto.getFullName() != null) ? dto.getFullName().trim() : "";
        if (fullName.isEmpty()) {
            pharmacist.setFirstName("Pharmacist");
            pharmacist.setLastName("");
        } else {
            String[] nameParts = fullName.split("\\s+", 2);
            pharmacist.setFirstName(nameParts[0]);
            pharmacist.setLastName(nameParts.length > 1 ? nameParts[1] : "");
        }

        pharmacist.setUsername(dto.getUsername());
        pharmacist.setEmail(dto.getEmail());
        pharmacist.setLicenseNumber(dto.getLicenseNumber());
        pharmacist.setPassword(dto.getPassword());
        pharmacist.setPhoneNumber(dto.getContact());
        
        if (dto.getDob() != null && !dto.getDob().trim().isEmpty()) {
            pharmacist.setDateOfBirth(LocalDate.parse(dto.getDob()));
        }
        if (dto.getJoined() != null && !dto.getJoined().trim().isEmpty()) {
            pharmacist.setDateOfJoining(LocalDate.parse(dto.getJoined()));
        }
        
        pharmacist.setAadharNumber(dto.getAdhar());
        pharmacist.setWorkingShift(dto.getShift());
        pharmacist.setAddress(dto.getAddress());

        return registerPharmacist(pharmacist);
    }

    /**
     * Core Registration Method (Handles Unique Checks, Password Hashing & Field Encryption)
     */
    @Transactional
    public Pharmacist registerPharmacist(Pharmacist pharmacist) {
        // 🌟 Fast boolean existence checks (prevents unneeded entity fetching)
        if (pharmacistRepository.existsByUsername(pharmacist.getUsername())) {
            throw new IllegalArgumentException("Username already exists: " + pharmacist.getUsername());
        }

        if (pharmacist.getEmail() != null && pharmacistRepository.existsByEmail(pharmacist.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + pharmacist.getEmail());
        }

        // 1. One-Way SHA-256 Password Hashing
        if (pharmacist.getPassword() != null) {
            pharmacist.setPassword(passwordEncoder.encode(pharmacist.getPassword()));
        }

        // 2. AES-256 Symmetric Encryption for Sensitive Fields (License & Aadhaar ID)
        if (pharmacist.getLicenseNumber() != null) {
            pharmacist.setLicenseNumber(aesEncryptionUtil.encrypt(pharmacist.getLicenseNumber()));
        }
        if (pharmacist.getAadharNumber() != null) {
            pharmacist.setAadharNumber(aesEncryptionUtil.encrypt(pharmacist.getAadharNumber()));
        }

        // Default employment status
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
        Pharmacist saved = pharmacistRepository.save(pharmacist);
        return decryptPharmacistForView(saved);
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

        Pharmacist saved = pharmacistRepository.save(pharmacist);
        return decryptPharmacistForView(saved);
    }
}