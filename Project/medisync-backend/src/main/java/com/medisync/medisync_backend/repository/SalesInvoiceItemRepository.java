package com.medisync.medisync_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medisync.medisync_backend.entity.SalesInvoiceItem;

@Repository
public interface SalesInvoiceItemRepository extends JpaRepository<SalesInvoiceItem, Integer> {

}