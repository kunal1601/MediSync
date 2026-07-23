package com.medisync.medisync_backend.controller;

import com.medisync.medisync_backend.security.CustomUserDetails;
import com.medisync.medisync_backend.security.JwtTokenProvider;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            // 1. Hand off credentials to AuthenticationManager
        	
        	System.out.println("Received Username: " + loginRequest.getUsername());
        	System.out.println("Received Password: " + loginRequest.getPassword());
        	
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // 2. Set authentication context
            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            
            // 3. Generate JWT Token
            String jwt = tokenProvider.generateToken(userDetails);

            // 4. Return success response payload
            return ResponseEntity.ok(Map.of(
                    "token", jwt,
                    "role", userDetails.getRole(),
                    "username", userDetails.getUsername(),
                    "id", userDetails.getId()
            ));

        } catch (BadCredentialsException | UsernameNotFoundException ex) {
            // 🌟 Catches invalid password or user not found and returns 401 instead of letting Spring throw a 403
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid username or password."));
        } catch (Exception ex) {
            // 🌟 Catches any unexpected internal errors (e.g. database, null pointer, password encoder issues)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Authentication error: " + ex.getMessage()));
        }
    }

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }
}