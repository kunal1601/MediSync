package com.medisync.medisync_backend.config;

import com.medisync.medisync_backend.entity.Admin;
import com.medisync.medisync_backend.repository.AdminRepository;
import com.medisync.medisync_backend.security.Sha256PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final Sha256PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (adminRepository.count() == 0) {
            Admin superAdmin = Admin.builder()
                    .username("admin")
                    .email("admin@medisync.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .fullName("Master Admin")
                    .status("ACTIVE")
                    .build();

            adminRepository.save(superAdmin);
            System.out.println("✅ Initial Super Admin created successfully!");
        }
    }
}