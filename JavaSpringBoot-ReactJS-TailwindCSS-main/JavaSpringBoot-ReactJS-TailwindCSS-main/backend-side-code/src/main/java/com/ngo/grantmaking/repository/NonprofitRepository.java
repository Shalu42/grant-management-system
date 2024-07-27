package com.ngo.grantmaking.repository;

import com.ngo.grantmaking.model.Nonprofit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NonprofitRepository extends JpaRepository<Nonprofit, Long> {
    List<Nonprofit> findByEmailIn(List<String> emails);

    List<Nonprofit> findByFoundationIdAndEmailIn(Long foundationId, List<String> emails);

    List<Nonprofit> findByFoundationId(Long foundationId);

    Boolean existsByFoundationIdAndEmail(Long foundationId, String emailId);

}
