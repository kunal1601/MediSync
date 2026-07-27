package com.medisync.medisync_backend.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.medisync.medisync_backend.service.AlertService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class AlertScheduler {

    private final AlertService alertService;

    // Runs every 10 seconds (for testing)
    @Scheduled(fixedRate = 10000)
    public void generateAlerts() {

        System.out.println("========================================");
        System.out.println("Scheduler Started...");
        System.out.println("========================================");

        try {

            alertService.generateSystemAlerts();

            System.out.println("========================================");
            System.out.println("Scheduler Finished Successfully");
            System.out.println("========================================");

        } catch (Exception ex) {

            System.out.println("========================================");
            System.out.println("Scheduler Failed");
            System.out.println("========================================");

            ex.printStackTrace();
        }
    }
}