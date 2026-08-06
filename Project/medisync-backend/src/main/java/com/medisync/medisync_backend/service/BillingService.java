package com.medisync.medisync_backend.service;

import java.math.BigDecimal;
import com.medisync.medisync_backend.dto.billing.InvoiceHistoryResponse;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medisync.medisync_backend.dto.billing.BillingMedicineResponse;
import com.medisync.medisync_backend.dto.billing.CreateInvoiceRequest;
import com.medisync.medisync_backend.dto.billing.CreateInvoiceResponse;
import com.medisync.medisync_backend.dto.billing.CustomerRequest;
import com.medisync.medisync_backend.dto.billing.InvoiceHistoryResponse;
import com.medisync.medisync_backend.dto.billing.InvoiceItemRequest;
import com.medisync.medisync_backend.entity.Customer;
import com.medisync.medisync_backend.entity.MedicineStock;
import com.medisync.medisync_backend.entity.SalesInvoice;
import com.medisync.medisync_backend.entity.SalesInvoiceItem;
import com.medisync.medisync_backend.repository.MedicineStockRepository;
import com.medisync.medisync_backend.repository.SalesInvoiceItemRepository;
import com.medisync.medisync_backend.repository.SalesInvoiceRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BillingService {
	
    private static final BigDecimal GST_PERCENTAGE = BigDecimal.valueOf(12);
    
    private static final BigDecimal HUNDRED = BigDecimal.valueOf(100);

	private final CustomerService customerService;

	private final MedicineStockRepository medicineStockRepository;

	private final SalesInvoiceRepository salesInvoiceRepository;

	private final SalesInvoiceItemRepository salesInvoiceItemRepository;

	public List<BillingMedicineResponse> getMedicinesForBilling() {

		List<MedicineStock> stocks = medicineStockRepository.findAvailableStocksForBilling();

		return stocks.stream().map(this::convertToBillingResponse).toList();
	}

	private BillingMedicineResponse convertToBillingResponse(MedicineStock stock) {

        return BillingMedicineResponse.builder()
                .stockId(stock.getStockId())
                .itemCode(stock.getMedicine().getItemCode())
                .medicineName(stock.getMedicine().getName())
                .manufacturer(stock.getMedicine().getManufacturer())
                .category(stock.getMedicine().getCategory())
                .batchNumber(stock.getBatchNumber())
                .sellingPrice(stock.getSellingPrice())
                .availableStock(stock.getStockQuantity())
                .build();
	}
	
	private InvoiceHistoryResponse convertToInvoiceHistory(SalesInvoice invoice) {

	    return InvoiceHistoryResponse.builder()
	            .invoiceNumber(invoice.getInvoiceNumber())
	            .customerName(invoice.getCustomer().getCustomerName())
	            .createdAt(invoice.getCreatedAt())
	            .paymentMode(invoice.getPaymentMode())
	            .grandTotal(invoice.getNetPayable())
	            .build();
	}
	
	public CreateInvoiceResponse createInvoice(CreateInvoiceRequest request) {

		if (request.getItems() == null || request.getItems().isEmpty()) {
		    throw new IllegalArgumentException("Invoice must contain at least one medicine.");
		}
		Customer customer = customerService.getOrCreateCustomer(
		        convertCustomer(request.getCustomer()));
		BigDecimal discountPercentage =
		        request.getDiscountPercentage() == null
		                ? BigDecimal.ZERO
		                : request.getDiscountPercentage();
		
		SalesInvoice invoice = SalesInvoice.builder()
		        .invoiceNumber(generateInvoiceNumber())
		        .customer(customer)
		        .paymentMode(request.getPaymentMode())
		        .discountPercentage(discountPercentage)
		        .grossTotal(BigDecimal.ZERO)
		        .taxAmount(BigDecimal.ZERO)
		        .netPayable(BigDecimal.ZERO)
		        .build();

		invoice = salesInvoiceRepository.save(invoice);
		BigDecimal grossTotal = BigDecimal.ZERO;
		for (InvoiceItemRequest itemRequest : request.getItems()) {

			if (itemRequest.getQuantity() <= 0) {
				throw new IllegalArgumentException(
						"Quantity must be greater than zero.");
			}
			
		    MedicineStock stock = medicineStockRepository.findById(itemRequest.getStockId())
		            .orElseThrow(() ->
		                    new RuntimeException("Medicine stock not found with id: "
		                            + itemRequest.getStockId()));

		    if (stock.getStockQuantity() < itemRequest.getQuantity()) {
		        throw new RuntimeException(
		                stock.getMedicine().getName() + " is out of stock.");
		    }
		    

		    BigDecimal lineTotal = stock.getSellingPrice()
		            .multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

		    SalesInvoiceItem invoiceItem = new SalesInvoiceItem();

		    invoiceItem.setSalesInvoice(invoice);
		    invoiceItem.setMedicine(stock.getMedicine());
		    invoiceItem.setStock(stock);
		    invoiceItem.setQuantity(itemRequest.getQuantity());
		    invoiceItem.setPrice(stock.getSellingPrice());
		    invoiceItem.setLineTotal(lineTotal);

		    salesInvoiceItemRepository.save(invoiceItem);

		    stock.setStockQuantity(
		            stock.getStockQuantity() - itemRequest.getQuantity());


		    grossTotal = grossTotal.add(lineTotal);
		}
		
		BigDecimal discountAmount = grossTotal
		        .multiply(discountPercentage)
		        .divide(HUNDRED, 2, RoundingMode.HALF_UP);

		BigDecimal taxableAmount = grossTotal.subtract(discountAmount);

		BigDecimal taxAmount = taxableAmount
				.multiply(GST_PERCENTAGE)
				.divide(HUNDRED, 2, RoundingMode.HALF_UP);

		BigDecimal netPayable = taxableAmount.add(taxAmount);
		
		invoice.setGrossTotal(grossTotal);	
		invoice.setTaxAmount(taxAmount);
		invoice.setNetPayable(netPayable);

		salesInvoiceRepository.save(invoice);
		
		return CreateInvoiceResponse.builder()
		        .invoiceNumber(invoice.getInvoiceNumber())
		        .customerName(customer.getCustomerName())
		        .grandTotal(netPayable)
		        .createdAt(invoice.getCreatedAt())
		        .build();
	}
	private Customer convertCustomer(CustomerRequest request) {

	    return Customer.builder()
	            .customerName(request.getCustomerName())
	            .contactNumber(request.getContactNumber())
	            .age(request.getAge())
	            .gender(request.getGender())
	            .build();
	}
	private String generateInvoiceNumber() {
		return "INV-" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
	}
	
	
	@Transactional(readOnly = true)
	public List<InvoiceHistoryResponse> getInvoiceHistory() {

	    return salesInvoiceRepository.findAllByOrderByCreatedAtDesc()
	            .stream()
	            .map(this::convertToInvoiceHistory)
	            .toList();
	}
	
}