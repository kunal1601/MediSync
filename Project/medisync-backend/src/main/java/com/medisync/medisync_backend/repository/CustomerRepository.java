package com.medisync.medisync_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medisync.medisync_backend.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByContactNumber(String contactNumber);

    boolean existsByContactNumber(String contactNumber);

}