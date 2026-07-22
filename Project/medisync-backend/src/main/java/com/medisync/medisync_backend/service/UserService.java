package com.medisync.medisync_backend.service;

import com.medisync.medisync_backend.entity.User;
import com.medisync.medisync_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // Fetch a user profile securely by their unique email identifier
    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Business Logic Rule: Register a new user account safely after checking for duplicates
    @Transactional
    public User registerNewUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Error: Email address is already registered in the system!");
        }
        
        // NOTE: We will inject password hashing algorithms here once Security configurations are added.
        return userRepository.save(user);
    }
}