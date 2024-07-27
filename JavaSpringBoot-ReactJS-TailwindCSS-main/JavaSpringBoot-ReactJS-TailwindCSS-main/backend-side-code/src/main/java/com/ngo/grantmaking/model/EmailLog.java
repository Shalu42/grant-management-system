package com.ngo.grantmaking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class EmailLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "foundation_id")
    private Long foundationId;

    @NotNull
    @Column(name = "nonprofit_id")
    private Long nonprofitId;

    @NotNull
    private String recipient;
    private String bcc;
    private String cc;
    @NotNull
    private String subject;
    @NotNull
    @Lob
    private String message;
    @NotNull
    private LocalDateTime sentAt;
}
