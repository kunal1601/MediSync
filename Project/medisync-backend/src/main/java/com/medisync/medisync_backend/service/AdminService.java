package com.medisync.medisync_backend.service;

import com.medisync.medisync_backend.entity.Admin;
import com.medisync.medisync_backend.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Admin> getAdminByUsername(String username) {
        return adminRepository.findByUsername(username);
    }

    // 🌟 ADDED: Lookup by email
    @Transactional(readOnly = true)
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    // 🌟 ADDED: Lookup by username or email for flexibility
    @Transactional(readOnly = true)
    public Optional<Admin> getAdminByUsernameOrEmail(String identifier) {
        return adminRepository.findByUsernameOrEmail(identifier, identifier);
    }

    @Transactional
    public Admin createAdmin(Admin admin) {
        // 🌟 UPDATED: Check for existing username OR email before persisting
        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists: " + admin.getUsername());
        }
        if (admin.getEmail() != null && adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists: " + admin.getEmail());
        }

        // Securely hash password before persisting using Sha256PasswordEncoder
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setStatus("ACTIVE");
        return adminRepository.save(admin);
    }

    @Transactional
    public Admin updateAdminStatus(Long id, String status) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found with ID: " + id));
        admin.setStatus(status);
        return adminRepository.save(admin);
    }
}