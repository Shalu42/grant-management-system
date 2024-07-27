package com.ngo.grantmaking.repository;

import com.ngo.grantmaking.model.Foundation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoundationRepository extends JpaRepository<Foundation, Long> {
    Boolean existsByEmail(String emailId);

    List<Foundation> findAllByActiveTrue();
}
