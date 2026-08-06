package com.medisync.medisync_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class PharmacistCardResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String workingShift;
    private String employmentStatus;

    public PharmacistCardResponse() {
    }

    public PharmacistCardResponse(Long id,
                                  String firstName,
                                  String lastName,
                                  String workingShift,
                                  String employmentStatus) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.workingShift = workingShift;
        this.employmentStatus = employmentStatus;
    }

    // Getters and Setters
}