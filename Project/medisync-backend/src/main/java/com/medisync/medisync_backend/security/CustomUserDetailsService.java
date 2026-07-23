package com.medisync.medisync_backend.security;

import com.medisync.medisync_backend.entity.Admin;
import com.medisync.medisync_backend.entity.Pharmacist;
import com.medisync.medisync_backend.repository.AdminRepository;
import com.medisync.medisync_backend.repository.PharmacistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final PharmacistRepository pharmacistRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        System.out.println("------------------------------------------");
        System.out.println("🔍 Step 1: Searching for user: [" + usernameOrEmail + "]");

        Optional<Admin> admin = adminRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (admin.isPresent()) {
            System.out.println("✅ Found Admin: " + admin.get().getUsername());
            System.out.println("💾 DB Password Hash: " + admin.get().getPassword());
            return new CustomUserDetails(admin.get(), usernameOrEmail);
        }

        Optional<Pharmacist> pharmacist = pharmacistRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (pharmacist.isPresent()) {
            System.out.println("✅ Found Pharmacist: " + pharmacist.get().getUsername());
            System.out.println("💾 DB Password Hash: " + pharmacist.get().getPassword());
            return new CustomUserDetails(pharmacist.get(), usernameOrEmail);
        }

        System.out.println("❌ Step 1 Failed: User NOT found in database!");
        System.out.println("------------------------------------------");
        throw new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail);
    }
}