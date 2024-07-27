package com.ngo.grantmaking.contoller;

import com.ngo.grantmaking.model.Foundation;
import com.ngo.grantmaking.service.FoundationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foundations")
public class FoundationController {
    @Autowired
    private FoundationService foundationService;

    @GetMapping
    public List<Foundation> getAllFoundations () {
        return foundationService.getAllFoundations();
    }

    @PostMapping
    public ResponseEntity<?> createFoundation(@RequestBody Foundation foundation) {
        Boolean isFoundationExists = foundationService.isFoundationsExists(foundation.getEmail());
        if ( !isFoundationExists ) {
            Foundation savedFoundation = foundationService.saveFoundation(foundation);
            return ResponseEntity.ok(savedFoundation);
        } else {
            return ResponseEntity.badRequest().body("Foundation already exists.");
        }
    }
}
