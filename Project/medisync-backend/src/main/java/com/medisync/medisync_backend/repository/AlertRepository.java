package com.medisync.medisync_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medisync.medisync_backend.entity.Alert;
import com.medisync.medisync_backend.entity.AlertStatus;
import com.medisync.medisync_backend.entity.AlertType;

public interface AlertRepository extends JpaRepository<Alert, Long> {

    // Pharmacist -> System Generated Alerts
    List<Alert> findByStatus(AlertStatus status);

    // Pharmacist -> Filter by request type if needed
    List<Alert> findByAlertType(AlertType alertType);

    // Admin -> Pending Requests
    List<Alert> findByStatusOrderByCreatedAtDesc(AlertStatus status);

    // All alerts sorted by latest first
    List<Alert> findAllByOrderByCreatedAtDesc();
}