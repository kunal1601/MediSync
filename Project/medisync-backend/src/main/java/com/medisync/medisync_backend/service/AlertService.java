package com.medisync.medisync_backend.service;

import java.util.List;

import com.medisync.medisync_backend.dto.AlertRequestDto;
import com.medisync.medisync_backend.dto.AlertResponseDto;

public interface AlertService {

    // Pharmacist Dashboard

    // System Generated Alerts
    List<AlertResponseDto> getSystemGeneratedAlerts();

    // Requests already sent to Admin
    List<AlertResponseDto> getRequestsSentToAdmin();

    // Pharmacist raises a new request
    AlertResponseDto raiseNewRequest(AlertRequestDto requestDto);

    // Pharmacist sends a system alert to Admin
    AlertResponseDto sendAlertToAdmin(Long alertId);

    // Admin Dashboard

    // Pending Requests
    List<AlertResponseDto> getPendingRequests();

    // Approve Request
    AlertResponseDto approveRequest(Long alertId);

    // Reject Request
    AlertResponseDto rejectRequest(Long alertId);
}