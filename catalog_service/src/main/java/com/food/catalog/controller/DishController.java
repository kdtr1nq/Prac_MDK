package com.food.catalog.controller;

import com.food.catalog.dto.*;
import com.food.catalog.service.DishService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog/dishes")
public class DishController {
    private final DishService service;
    public DishController(DishService service) { this.service = service; }

    @GetMapping
    public List<DishResponse> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public DishResponse one(@PathVariable Long id) { return service.findById(id); }

    // ВНИМАНИЕ: доступ к этим методам ограничивает Gateway (роль ADMIN)
    @PostMapping
    public DishResponse create(@RequestBody @Valid CreateDishRequest body) { return service.create(body); }

    @PutMapping("/{id}")
    public DishResponse update(@PathVariable Long id, @RequestBody @Valid UpdateDishRequest body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }
}
