package com.medisync.medisync_backend.service;

import com.medisync.medisync_backend.dto.ChatRequestDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.Map;
import java.util.HashMap;

@Service
public class AIChatService {

    private final RestTemplate restTemplate;
    // 🟢 CHANGED: Using explicit IPv4 loopback address (127.0.0.1) instead of 'localhost'
    private static final String PYTHON_AI_SERVICE_URL = "http://127.0.0.1:8000/api/ai/chat";

    public AIChatService() {
        this.restTemplate = new RestTemplate();
    }

    public Map<String, String> getAIResponse(String prompt, String context) {
        ChatRequestDTO requestDto = new ChatRequestDTO(
            prompt, 
            context != null ? context : "General Pharmacy"
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ChatRequestDTO> entity = new HttpEntity<>(requestDto, headers);
        Map<String, String> result = new HashMap<>();

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                PYTHON_AI_SERVICE_URL, 
                entity, 
                Map.class
            );

            if (response.getBody() != null && response.getBody().containsKey("response")) {
                result.put("reply", (String) response.getBody().get("response"));
                
                // Pass key_used back to controller if present
                if (response.getBody().containsKey("key_used")) {
                    result.put("key_used", (String) response.getBody().get("key_used"));
                }
                return result;
            }

            result.put("reply", "No response received from AI service.");
            return result;

        } catch (Exception e) {
            System.err.println("❌ FastAPI Connection Error: " + e.getMessage());
            e.printStackTrace(); // 👈 Useful for printing stack trace in Spring console
            result.put("reply", "AI Service Error: Ensure Python FastAPI microservice is running on port 8000.");
            return result;
        }
    }
}