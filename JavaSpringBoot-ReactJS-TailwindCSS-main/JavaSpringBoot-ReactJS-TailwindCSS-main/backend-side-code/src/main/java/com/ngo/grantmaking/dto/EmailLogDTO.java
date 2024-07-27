package com.ngo.grantmaking.dto;

import java.time.LocalDateTime;

public class EmailLogDTO {
    private Long id;
    private Long foundationId;
    private Long nonprofitId;
    private String recipient;
    private String subject;
    private String message;
    private LocalDateTime sentAt;
}
