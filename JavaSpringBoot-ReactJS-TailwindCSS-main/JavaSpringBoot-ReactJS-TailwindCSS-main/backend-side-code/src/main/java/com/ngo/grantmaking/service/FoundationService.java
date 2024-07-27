package com.ngo.grantmaking.service;

import com.ngo.grantmaking.model.Foundation;
import com.ngo.grantmaking.repository.FoundationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoundationService {
    @Autowired
    private FoundationRepository foundationRepository;

    public Foundation saveFoundation(Foundation foundation) {
        return foundationRepository.save(foundation);
    }

    public Boolean isFoundationsExists(String emailId) {
        return foundationRepository.existsByEmail(emailId);
    }

    public List<Foundation> getAllFoundations() {
        return foundationRepository.findAllByActiveTrue();
    }

    public Optional<Foundation> getFoundationById(Long id) {
        return foundationRepository.findById(id);
    }

}
