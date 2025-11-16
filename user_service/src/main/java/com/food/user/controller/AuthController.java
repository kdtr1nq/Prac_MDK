package com.food.user.controller;

import com.food.user.model.AppUser;
import com.food.user.security.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@Tag(name = "User Service", description = "API для управления пользователями и аутентификацией")
public class AuthController {
    private final UserService service;
    public AuthController(UserService service){ this.service = service; }

    @PostMapping("/register")
    @Operation(summary = "Регистрация нового пользователя")
    public AppUser register(@RequestBody Map<String,String> body){
        return service.register(body.get("email"), body.get("fullName"), body.get("password"));
    }

    @PostMapping("/login")
    @Operation(summary = "Вход в систему")
    public Map<String,String> login(@RequestBody Map<String,String> body){
        String token = service.login(body.get("email"), body.get("password"));
        return Map.of("token", token);
    }

    @PostMapping("/{id}/make-admin")
    @Operation(summary = "Назначить администратора")
    public void makeAdmin(@PathVariable Long id){ 
        service.makeAdmin(id); 
    }
}
