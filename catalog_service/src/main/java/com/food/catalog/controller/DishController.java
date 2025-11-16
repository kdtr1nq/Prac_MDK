package com.food.catalog.controller;

import com.food.catalog.dto.*;
import com.food.catalog.service.DishService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catalog/dishes")
@Tag(name = "Catalog Service", description = "API для управления каталогом блюд")
public class DishController {
    private final DishService service;
    public DishController(DishService service) { this.service = service; }

    @GetMapping
    @Operation(summary = "Получить все блюда")
    public List<DishResponse> all() { return service.findAll(); }

    @GetMapping("/{id}")
    @Operation(summary = "Получить блюдо по ID")
    public DishResponse one(@PathVariable Long id) { 
        return service.findById(id); 
    }

    @PostMapping
    @Operation(summary = "Создать новое блюдо")
    public DishResponse create(@RequestBody @Valid CreateDishRequest body) { 
        return service.create(body); 
    }

    @PutMapping("/{id}")
    @Operation(summary = "Обновить блюдо")
    public DishResponse update(@PathVariable Long id, 
            @RequestBody @Valid UpdateDishRequest body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Удалить блюдо")
    public void delete(@PathVariable Long id) { 
        service.delete(id); 
    }
}
