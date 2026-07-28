package com.medisync.medisync_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medisync.medisync_backend.entity.AlertType;
import com.medisync.medisync_backend.entity.Medicine;
import com.medisync.medisync_backend.entity.MedicineStock;

import com.medisync.medisync_backend.entity.Alert;
import com.medisync.medisync_backend.entity.AlertStatus;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

	
	
    // System Generated Alerts
    List<Alert> findByStatusOrderByCreatedAtDesc(AlertStatus status);

    List<Alert> findByStatusIn(List<AlertStatus> statuses);
    
    List<Alert> findByStatus(AlertStatus status);
    
    List<Alert> findByAlertTypeInOrderByCreatedAtDesc(List<AlertType> alertTypes);
    
    // Requests sent to Admin
    List<Alert> findByStatusInOrderByCreatedAtDesc(List<AlertStatus> statuses);
    
    Optional<Alert> findByMedicineAndAlertTypeAndStatus(
	        Medicine medicine,
	        AlertType alertType,
	        AlertStatus status
	);
	
	Optional<Alert> findByMedicineStockAndAlertTypeAndStatus(
	        MedicineStock medicineStock,
	        AlertType alertType,
	        AlertStatus status
	);
	
	List<Alert> findByMedicineAndAlertTypeAndStatusIn(
	        Medicine medicine,
	        AlertType alertType,
	        List<AlertStatus> statuses
	);

	List<Alert> findByMedicineStockAndAlertTypeAndStatusIn(
	        MedicineStock medicineStock,
	        AlertType alertType,
	        List<AlertStatus> statuses
	);

}