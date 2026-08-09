package com.medisync.medisync_backend.service;

import com.medisync.medisync_backend.entity.Customer;
import com.medisync.medisync_backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Transactional
    public Customer getOrCreateCustomer(Customer customer) {

        return customerRepository
                .findByContactNumber(customer.getContactNumber())
                .orElseGet(() -> customerRepository.save(customer));
    }
}