package com.ngo.grantmaking.service;

import com.ngo.grantmaking.repository.NonprofitRepository;
import com.ngo.grantmaking.model.Nonprofit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NonprofitService {
    @Autowired
    private NonprofitRepository nonprofitRepository;

    public Nonprofit saveNonprofit(Nonprofit nonprofit) {
        return nonprofitRepository.save(nonprofit);
    }

    public Boolean isNonprofitExists(Long foundationId, String emailId) {
        return nonprofitRepository.existsByFoundationIdAndEmail(foundationId, emailId);
    }

    public List<Nonprofit> getAllNonprofits(Long foundationId) {
        return nonprofitRepository.findByFoundationId(foundationId);
    }

    public List<Nonprofit> getNonprofitsByEmails(List<String> emails, Long foundationId) {
        return nonprofitRepository.findByFoundationIdAndEmailIn(foundationId, emails);
    }
}
