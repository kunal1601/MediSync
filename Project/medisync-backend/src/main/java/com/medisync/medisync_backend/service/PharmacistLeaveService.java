package com.medisync.medisync_backend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medisync.medisync_backend.dto.PharmacistLeaveResponse;
import com.medisync.medisync_backend.repository.PharmacistLeaveRepository;

@Service
public class PharmacistLeaveService {

    @Autowired
    private PharmacistLeaveRepository pharmacistLeaveRepository;

    public List<PharmacistLeaveResponse> getLeavesByDate(LocalDate date) {

        List<Object[]> result = pharmacistLeaveRepository.getLeavesByDate(date);

        List<PharmacistLeaveResponse> response = new ArrayList<>();

        for (Object[] row : result) {

            PharmacistLeaveResponse dto = new PharmacistLeaveResponse();

            dto.setPharmacistName((String) row[0]);
            dto.setWorkingShift((String) row[1]);
            dto.setLeaveReason((String) row[2]);
            dto.setLeaveType((String) row[3]);

            response.add(dto);
        }

        return response;
    }
    
    public List<LocalDate> getLeaveDates(int year,int month){
        return pharmacistLeaveRepository.getLeaveDates(year,month);
    }
}