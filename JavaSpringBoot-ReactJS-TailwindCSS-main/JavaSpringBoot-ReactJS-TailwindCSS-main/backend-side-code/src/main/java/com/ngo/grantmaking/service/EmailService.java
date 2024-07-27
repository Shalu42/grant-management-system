package com.ngo.grantmaking.service;

import com.ngo.grantmaking.model.Nonprofit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {
    @Autowired
    private EmailLogService emailLogService;

    public void sendEmailToNonprofits(
            Long foundationId,
            List<Nonprofit> nonprofits,
            String messageTemplate,
            String bcc,
            String cc
    ) {
        String subject = "Grant Information";
        for (Nonprofit nonprofit : nonprofits) {
            String message = messageTemplate
                    .replace("{name}", nonprofit.getName())
                    .replace("{address}", nonprofit.getAddress());

            // Send email with the templated message
            emailLogService.logEmail(foundationId, nonprofit.getId(), nonprofit.getEmail(), bcc, cc, subject, message);
            sendEmail(
                    nonprofit.getEmail(),
                    bcc,
                    cc,
                    subject,
                    message
            );
        }
    }

    // Mock method to simulate sending email
    private void sendEmail(String recipient, String bcc, String cc, String subject, String message) {
        System.out.println("Sending email to: " + recipient);
        System.out.println("Sending BCC: " + recipient);
        System.out.println("Sending CC: " + recipient);
        System.out.println("Subject: " + subject);
        System.out.println("Message: " + message);
    }
}
