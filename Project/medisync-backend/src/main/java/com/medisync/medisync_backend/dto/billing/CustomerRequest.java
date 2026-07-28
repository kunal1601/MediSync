package com.medisync.medisync_backend.dto.billing;

import com.medisync.medisync_backend.entity.Customer.Gender;

import lombok.Data;

@Data
public class CustomerRequest {

    private String customerName;

    private String contactNumber;

    private Integer age;

    private Gender gender;
}