package com.medisync.medisync_backend.dto.billing;

import com.medisync.medisync_backend.entity.Customer.Gender;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerRequest {

    private String customerName;

    private String contactNumber;

    private Integer age;

    private Gender gender;
}