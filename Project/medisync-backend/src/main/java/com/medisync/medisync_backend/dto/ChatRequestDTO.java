package com.medisync.medisync_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRequestDTO {

    @NotBlank(message = "Prompt cannot be blank")
    private String prompt;

    private String context; // Optional, so @NotBlank isn't required unless mandatory
}