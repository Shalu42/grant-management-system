package com.ngo.grantmaking.repository;

import com.ngo.grantmaking.model.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {
    List<EmailLog> findByFoundationId(Long foundationId);

    List<EmailLog> findByNonprofitId(Long nonprofitId);
}
