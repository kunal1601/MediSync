package com.medisync.medisync_backend.controller;

import com.medisync.medisync_backend.dto.ChatRequestDTO;
import com.medisync.medisync_backend.service.AIChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AIChatController {

    private final AIChatService aiChatService;

    @PostMapping("/query")
    public ResponseEntity<Map<String, String>> chatWithBot(@RequestBody ChatRequestDTO request) {
        Map<String, String> response = aiChatService.getAIResponse(request.getPrompt(), request.getContext());
        return ResponseEntity.ok(response);
    }
}