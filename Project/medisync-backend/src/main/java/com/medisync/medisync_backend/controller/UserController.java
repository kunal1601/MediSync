package com.medisync.medisync_backend.controller;

import com.medisync.medisync_backend.entity.User;
import com.medisync.medisync_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Permits data handshakes with your React Vite app
public class UserController {

    private final UserService userService;

    // Route to handle checking user profiles during login processing
    @GetMapping("/lookup")
    public ResponseEntity<?> lookupUserByEmail(@RequestParam String email) {
        Optional<User> userOpt = userService.getUserByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Account record not found in system databases.");
        }
        
        return ResponseEntity.ok(userOpt.get());
    }

    // Endpoint mapping for new system registrations
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerNewUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}