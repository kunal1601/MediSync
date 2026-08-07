package com.medisync.medisync_backend.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medisync.medisync_backend.entity.AlertType;
import com.medisync.medisync_backend.entity.Medicine;
import com.medisync.medisync_backend.entity.MedicineStock;

import com.medisync.medisync_backend.entity.Alert;
import com.medisync.medisync_backend.entity.AlertStatus;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

	

    List<Alert> findByStatusIn(List<AlertStatus> statuses);
    
    List<Alert> findByStatus(AlertStatus status);
    
    List<Alert> findByAlertTypeInOrderByCreatedAtDesc(List<AlertType> alertTypes);
    
    List<Alert> findByAlertTypeInAndStatusOrderByCreatedAtDesc(List<AlertType> alertTypes,
            AlertStatus status
    );
    List<Alert> findByStatusAndAlertTypeInOrderByCreatedAtDesc(
            AlertStatus status,
            List<AlertType> alertTypes
    );
    
    // Requests sent to Admin
    List<Alert> findByStatusInOrderByCreatedAtDesc(List<AlertStatus> statuses);
 
	
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