package com.medisync.medisync_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medisync.medisync_backend.entity.Alert;
import com.medisync.medisync_backend.entity.AlertStatus;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

    // System Generated Alerts
    List<Alert> findByStatusOrderByCreatedAtDesc(AlertStatus status);

    // Requests sent to Admin
    List<Alert> findByStatusInOrderByCreatedAtDesc(List<AlertStatus> statuses);

}