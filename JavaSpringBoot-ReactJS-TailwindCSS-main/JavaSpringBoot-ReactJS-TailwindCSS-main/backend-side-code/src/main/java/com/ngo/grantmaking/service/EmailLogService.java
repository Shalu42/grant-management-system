package com.ngo.grantmaking.service;

import com.ngo.grantmaking.model.EmailLog;
import com.ngo.grantmaking.repository.EmailLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmailLogService {
    @Autowired
    private EmailLogRepository emailLogRepository;

    public void logEmail(Long foundationId, Long nonprofitId, String recipient, String bcc, String cc, String subject, String message) {
        EmailLog emailLog = new EmailLog();
        emailLog.setFoundationId(foundationId);
        emailLog.setNonprofitId(nonprofitId);
        emailLog.setRecipient(recipient);
        emailLog.setBcc(bcc);
        emailLog.setCc(cc);
        emailLog.setSubject(subject);
        emailLog.setMessage(message);
        emailLog.setSentAt(LocalDateTime.now());

        emailLogRepository.save(emailLog);
    }

    public List<EmailLog> getAllEmailLogsByFoundation(Long foundationId) {
        return emailLogRepository.findByFoundationId(foundationId);
    }

    public  List<EmailLog> getALLEmailLogsByNonprofit(Long nonprofitId) {
        return  emailLogRepository.findByNonprofitId(nonprofitId);
    }
}
