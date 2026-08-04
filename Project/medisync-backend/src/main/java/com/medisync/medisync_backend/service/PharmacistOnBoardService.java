package com.medisync.medisync_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.PharmacistCardResponse;
import com.medisync.medisync_backend.dto.PharmacistDetailsResponse;
import com.medisync.medisync_backend.entity.Pharmacist;
import com.medisync.medisync_backend.repository.PharmacistRepository;
import com.medisync.medisync_backend.security.AesEncryptionUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PharmacistOnBoardService {
	// Repository used to interact with Pharmacist table
	 private final PharmacistRepository pharmacistRepository;
	 private final AesEncryptionUtil aesEncryptionUtil;
	 	/*
	     * Fetch complete details of a pharmacist by ID.
	     * Used when user clicks the "View" button on the dashboard.
	     */
	 public PharmacistDetailsResponse getPharmacistDetails(Long pharmacistId) {
		   // Fetch pharmacist from database using ID.
	        // If pharmacist is not found, throw an exception.
	        Pharmacist pharmacist = pharmacistRepository.findById(pharmacistId)
	                .orElseThrow(() ->
	                        new RuntimeException("Pharmacist not found"));
	        // Decrypt Aadhaar Number
	        String decryptedAadhar =
	                aesEncryptionUtil.decrypt(pharmacist.getAadharNumber());
	     // Convert Entity into DTO and return it
	        return PharmacistDetailsResponse.builder()
	                .id(pharmacist.getId())
	                .firstName(pharmacist.getFirstName())
	                .lastName(pharmacist.getLastName())
	                .dateOfBirth(pharmacist.getDateOfBirth())
	                .aadharNumber(decryptedAadhar)
	                .dateOfJoining(pharmacist.getDateOfJoining())
	                .workingShift(pharmacist.getWorkingShift())
	                .build();
	    }
	 /*
	     * Fetch all active pharmacists.
	     * Used to display pharmacist cards on the dashboard.
	     */
	 
	 public List<PharmacistCardResponse> getAllPharmacists() {
		 // Get only active pharmacists from the database
		    List<Pharmacist> pharmacists = pharmacistRepository.getActivePharmacists();
		    // Convert each Pharmacist entity into PharmacistCardResponse DTO
		    return pharmacists.stream()
		            .map(p -> new PharmacistCardResponse(
		                    p.getId(),
		                    p.getFirstName(),
		                    p.getLastName(),
		                    p.getWorkingShift(),
		                    p.getEmploymentStatus()
		            ))
		            .toList();
		}
}

