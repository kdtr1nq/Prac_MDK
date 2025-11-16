package com.food.user.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Утилита для генерации BCrypt хешей паролей
 * Запустите main метод, чтобы получить хеш для пароля "123"
 */
public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "123";
        String hash = encoder.encode(password);
        System.out.println("Пароль: " + password);
        System.out.println("BCrypt хеш: " + hash);
    }
}

