package com.medisync.medisync_backend.security;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Component
public class Sha256PasswordEncoder implements PasswordEncoder {

    @Override
    public String encode(CharSequence rawPassword) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawPassword.toString().getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        if (rawPassword == null || encodedPassword == null) {
            return false;
        }

        String computedHash = encode(rawPassword.toString().trim());
        String dbHash = encodedPassword.trim();

        // 🌟 DEBUG PRINTS - Watch your STS console output!
        System.out.println("------------------------------------------");
        System.out.println("🔑 Raw Password Input: [" + rawPassword + "]");
        System.out.println("⚙️ Computed Hash:     [" + computedHash + "]");
        System.out.println("💾 DB Stored Hash:     [" + dbHash + "]");
        System.out.println("------------------------------------------");

        return computedHash.equalsIgnoreCase(dbHash);
    }
}