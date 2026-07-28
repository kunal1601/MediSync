package com.medisync.medisync_backend.repository;

import com.medisync.medisync_backend.entity.Pharmacist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PharmacistRepository extends JpaRepository<Pharmacist, Long> {

    Optional<Pharmacist> findByUsername(String username);

    Optional<Pharmacist> findByEmail(String email);

    Optional<Pharmacist> findByUsernameOrEmail(String username, String email);

    List<Pharmacist> findByEmploymentStatus(String employmentStatus);

    // 🌟 Boolean existence checks for registration validation
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByLicenseNumber(String licenseNumber);

    boolean existsByAadharNumber(String aadharNumber);
}