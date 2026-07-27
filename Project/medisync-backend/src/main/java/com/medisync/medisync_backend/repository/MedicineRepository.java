package com.medisync.medisync_backend.repository;

import com.medisync.medisync_backend.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer> {

	// Quick barcode/item lookup method for the smart billing console
	Optional<Medicine> findByItemCode(String itemCode);

	// Checks whether a medicine already exists with the same item code(so that if )
	boolean existsByItemCode(String itemCode);
	
	Optional<Medicine> findByNameIgnoreCase(String name);

	
}