package com.medisync.medisync_backend.dto;

import lombok.Data;

@Data
public class PharmacistRegistrationDTO {
    private String fullName;
    private String username;
    private String email;
    private String licenseNumber;
    private String password;
    private String contact;
    private String dob;
    private String joined;
    private String adhar;
    private String shift;
    private String address;
}