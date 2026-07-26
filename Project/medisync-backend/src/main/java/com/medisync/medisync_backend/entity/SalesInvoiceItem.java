package com.medisync.medisync_backend.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="sales_invoice_items")
@Getter
@Setter
public class SalesInvoiceItem {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="invoice_item_id")
	private Integer invoiceItemId;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="invoice_id",nullable=false)
	private SalesInvoice salesInvoice;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="medicine_id" , nullable=false)
	private Medicine medicine;
	
	@Column(nullable=false)
	private Integer quantity;
	
	@Column(nullable=false,precision=10,scale=2)
	private BigDecimal  price;
	
	public SalesInvoiceItem() {
    }
}
