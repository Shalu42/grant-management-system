package com.ngo.grantmaking.contoller;

import com.ngo.grantmaking.model.EmailLog;
import com.ngo.grantmaking.model.Foundation;
import com.ngo.grantmaking.model.Nonprofit;
import com.ngo.grantmaking.service.EmailLogService;
import com.ngo.grantmaking.service.EmailService;
import com.ngo.grantmaking.service.FoundationService;
import com.ngo.grantmaking.service.NonprofitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/nonprofits")
public class NonprofitController {
    @Autowired
    private NonprofitService nonprofitService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailLogService emailLogService;

    @Autowired
    private FoundationService foundationService;

    @GetMapping("/{foundationId}")
    public List<Nonprofit> getAllNonProfits (
            @PathVariable Long foundationId
    ) {
        return nonprofitService.getAllNonprofits(foundationId);
    }

    @PostMapping("/{foundationId}")
    public ResponseEntity<?> createNonprofit(
            @PathVariable Long foundationId,
            @RequestBody Nonprofit nonprofit
    ) {
        Optional<Foundation> foundationOptional = foundationService.getFoundationById(foundationId);

        if (foundationOptional.isPresent()) {
            Foundation foundation = foundationOptional.get();
            nonprofit.setFoundation(foundation);
            boolean nonprofitExists = nonprofitService.isNonprofitExists(foundationId, nonprofit.getEmail());
            if( nonprofitExists ) {
                return ResponseEntity.badRequest().body("Non-profit already exists.");
            } else {
                Nonprofit savedNonprofit = nonprofitService.saveNonprofit(nonprofit);
                return ResponseEntity.ok(savedNonprofit);
            }
        } else {
            return ResponseEntity.notFound().build(); // Foundation not found with the provided ID
        }
    }

    @PostMapping("/send-email/{foundationId}")
    public ResponseEntity<String> sendEmailToNonprofits(
            @PathVariable Long foundationId,
            @RequestBody Map<String, Object> requestBody
    ) {
        List<String> nonprofitEmails = (List<String>) requestBody.get("nonprofitEmails");
        String messageTemplate = (String) requestBody.get("messageTemplate");
        String bcc = (String) requestBody.get("bcc");
        String cc = (String) requestBody.get("cc");

        List<Nonprofit> nonprofits = nonprofitService.getNonprofitsByEmails(nonprofitEmails, foundationId);
        emailService.sendEmailToNonprofits(foundationId, nonprofits, messageTemplate, bcc, cc);

        return ResponseEntity.ok("Request has been taken.");
    }

//    @GetMapping("/email-logs/{foundationId}")
//    public List<EmailLog> getAllEmailLogs(
//            @PathVariable Long foundationId
//    ) {
//        return emailLogService.getAllEmailLogsByFoundation(foundationId);
//    }

    @GetMapping("/email-logs/{nonprofitId}")
    public List<EmailLog> getAllEmailLogsByNonprofit(
            @PathVariable Long nonprofitId
    ) {
        return emailLogService.getALLEmailLogsByNonprofit(nonprofitId);
    }
}
