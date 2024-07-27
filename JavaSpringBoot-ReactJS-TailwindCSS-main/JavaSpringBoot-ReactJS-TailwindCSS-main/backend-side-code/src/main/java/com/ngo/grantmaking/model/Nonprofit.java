package com.ngo.grantmaking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

@Entity
@Getter
@Setter
public class Nonprofit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;
    @NotNull
    private String address;
    @NotNull
    private String email;

    @Column(columnDefinition = "boolean default true")
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "foundation_id")
    @JsonIgnore // Ignore serialization of Foundation field to prevent cyclic reference
    private Foundation foundation;

    public Nonprofit() {
        this.active = true; // Default value
    }
}
