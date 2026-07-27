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
     * Used only when medicine is not present
     * in the inventory.
     */
    private String requestedMedicineName;

    /*
     * RESTOCK_REQUEST
     * CUSTOMER_DEMAND
     * SPECIAL_ORDER
     */
    private AlertType alertType;

    /*
     * Pharmacist's request details.
     */
    private String description;
}