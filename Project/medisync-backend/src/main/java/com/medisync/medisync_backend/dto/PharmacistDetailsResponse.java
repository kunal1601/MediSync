package com.medisync.medisync_backend.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


/*
 * DTO used to send complete pharmacist details
 * from the backend to the frontend.
 *
 * This response is returned when the user clicks
 * the "View" button on a pharmacist card.
 */
@Data
@Builder
@Getter
@Setter
public class PharmacistDetailsResponse {
	 	// Unique ID of the pharmacist
	 	private Long id;
	 	
	 	// Pharmacist's first name
	    private String firstName;
	    
	    // Pharmacist's last name
	    private String lastName;

	    // Pharmacist's date of birth
	    private LocalDate dateOfBirth;
	    
	    // Pharmacist's Aadhaar number
	    private String aadharNumber;

	    // Date when the pharmacist joined the organization
	    private LocalDate dateOfJoining;

	    // Working shift (Morning, Evening, Night)
	    private String workingShift;
}
