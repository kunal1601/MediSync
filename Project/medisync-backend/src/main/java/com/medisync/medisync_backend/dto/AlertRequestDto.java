package com.medisync.medisync_backend.dto;

import com.medisync.medisync_backend.entity.AlertType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlertRequestDto {

    /*
     * Existing medicine selected from dropdown.
     * Null if pharmacist typed a new medicine.
     */
    private Integer medicineId;

    /*
     * Medicine typed by pharmacist.
     */
    private String medicineName;

    /*
     * RESTOCK_REQUEST
     * CUSTOMER_DEMAND
     * SPECIAL_ORDER
     */
    private AlertType alertType;

    /*
     * Pharmacist notes.
     */
    private String description;
    
}