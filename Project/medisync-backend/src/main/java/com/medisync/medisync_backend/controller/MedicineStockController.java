package com.medisync.medisync_backend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medisync.medisync_backend.dto.AddStockRequest;
import com.medisync.medisync_backend.dto.InventoryLossRequest;
import com.medisync.medisync_backend.dto.InventoryLossResponse;
import com.medisync.medisync_backend.dto.MedicineStockResponse;
import com.medisync.medisync_backend.dto.common.PageResponse;
import com.medisync.medisync_backend.entity.MedicineStock;
import com.medisync.medisync_backend.service.InventoryLossServiceImpl;
import com.medisync.medisync_backend.service.MedicineStockService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
@Validated
public class MedicineStockController {

    private final MedicineStockService medicineStockService;
   
    private final InventoryLossServiceImpl inventoryLossService;
    /**
     * Add Stock
     */
    @PostMapping
    public ResponseEntity<MedicineStock> addStock(
            @Valid @RequestBody AddStockRequest request) {
    	

        MedicineStock stock = medicineStockService.addStock(request);

        return new ResponseEntity<>(stock, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<PageResponse<MedicineStockResponse>> getAllStocks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        return ResponseEntity.ok(
                medicineStockService.getAllStocks(page, size)
        );
    }

    /**
     * Get Expiring Medicines
     */
    @GetMapping("/expiring")
    public ResponseEntity<List<MedicineStock>> getExpiringMedicines() {

        return ResponseEntity.ok(
                medicineStockService.getExpiringMedicines()
        );
    }

    /**
     * Dashboard Analytics
     */
    @GetMapping("/analytics")
    public ResponseEntity<List<Object[]>> getStockAnalytics() {

        return ResponseEntity.ok(
                medicineStockService.getStockAnalyticsData()
        );
    }
    
 

    @PostMapping("/invLoss")
    public ResponseEntity<InventoryLossResponse> reportLoss(
            @RequestBody InventoryLossRequest request){
    	 System.out.println("Inside reportLoss Controller");
        return ResponseEntity.ok(
                inventoryLossService.reportLoss(request)
        );
    }

    @GetMapping("/getInventory-loss")
    public ResponseEntity<List<InventoryLossResponse>> getAllLosses(){

        return ResponseEntity.ok(
                inventoryLossService.getAllLosses()
        );
    }
   

}
