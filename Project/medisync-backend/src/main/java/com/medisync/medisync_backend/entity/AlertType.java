package com.medisync.medisync_backend.entity;

public enum AlertType {

    OUT_OF_STOCK,
    LOW_STOCK,
    NEAR_EXPIRY,
    EXPIRED,

    RESTOCK_REQUEST,
    CUSTOMER_DEMAND,
    SPECIAL_ORDER,
    OTHER
}