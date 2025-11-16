package com.food.user.controller;

import com.food.user.model.AppUser;
import com.food.user.security.UserService;
import jakarta.validation.constraints.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class AuthController {
    private final UserService service;
    public AuthController(UserService service){ this.service = service; }

    @PostMapping("/register")
    public AppUser register(@RequestBody Map<String,String> body){
        return service.register(body.get("email"), body.get("fullName"), body.get("password"));
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody Map<String,String> body){
        String token = service.login(body.get("email"), body.get("password"));
        return Map.of("token", token);
    }

    @PostMapping("/{id}/make-admin")
    public void makeAdmin(@PathVariable Long id){ service.makeAdmin(id); }
}
