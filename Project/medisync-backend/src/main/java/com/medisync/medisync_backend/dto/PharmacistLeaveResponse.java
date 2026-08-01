package com.medisync.medisync_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PharmacistLeaveResponse {

    private String pharmacistName;

    private String workingShift;

    private String leaveReason;

    private String leaveType;
}