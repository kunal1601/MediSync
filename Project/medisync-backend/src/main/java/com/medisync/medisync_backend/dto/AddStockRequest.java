package com.medisync.medisync_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import com.medisync.medisync_backend.entity.Medicine.Category;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddStockRequest {

    @NotBlank(message = "Item Code is required")
    private String itemCode;

    @NotBlank(message = "Medicine Name is required")
    private String name;

    @NotBlank(message = "Manufacturer is required")
    private String manufacturer;

    @NotNull(message = "Category is required")
    private Category category;

    @NotBlank(message = "Batch Number is required")
    private String batchNumber;

    @NotNull(message = "Expiry Date is required")
    private LocalDate expiryDate;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than zero")
    private BigDecimal purchasePrice;
    
    @NotNull
    @DecimalMin("0.01")
    private BigDecimal sellingPrice;

    @NotNull(message = "Stock Quantity is required")
    @Min(value = 1, message = "Quantity should be at least 1")
    private Integer stockQuantity;
}