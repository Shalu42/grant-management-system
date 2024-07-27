package com.ngo.grantmaking.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.List;

@Entity
@Getter
@Setter
public class Foundation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @Column(columnDefinition = "boolean default true")
    private Boolean active;

    @OneToMany(mappedBy = "foundation")
    private List<Nonprofit> nonprofits;

    public Foundation() {
        this.active = true; // Default value
    }
}
