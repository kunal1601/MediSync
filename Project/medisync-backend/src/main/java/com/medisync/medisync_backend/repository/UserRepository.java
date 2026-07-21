package com.medisync.medisync_backend.repository;

import com.medisync.medisync_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // Crucial lookup query method for the authentication layer
    Optional<User> findByEmail(String email);
    
    // Optional utility check to see if an account already exists during registration
    Boolean existsByEmail(String email);
}