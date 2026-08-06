package com.medisync.medisync_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medisync.medisync_backend.entity.InventoryLoss;

public interface InventoryLossRepository
        extends JpaRepository<InventoryLoss, Long> {

}