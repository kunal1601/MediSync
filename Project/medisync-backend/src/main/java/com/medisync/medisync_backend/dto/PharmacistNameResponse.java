package com.medisync.medisync_backend.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class PharmacistNameResponse {
	 private String firstName;
	 private String lastName;
}
