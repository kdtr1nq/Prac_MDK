package com.food.user.model;

import jakarta.persistence.*;

@Entity
@Table(name="app_user")
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false, unique=true) private String email;
    @Column(nullable=false) private String passwordHash;
    @Column(nullable=false) private String fullName;
    @Column(nullable=false) private String role = "USER"; // USER or ADMIN

    // getters/setters
}
