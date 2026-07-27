package com.medisync.medisync_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodaysAlertResponse {

    // Medicine Name
    private String medicineName;

    // Out Of Stock / Near Expiry / Expired
    private String alertType;

    // High / Medium
    private String priority;

}