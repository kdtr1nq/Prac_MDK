package com.food.order.controller;

import com.food.order.dto.CreateOrderRequest;
import com.food.order.dto.OrderResponse;
import com.food.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Order Service", description = "API для управления заказами")
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service){ this.service = service; }

    @GetMapping
    @Operation(summary = "Получить все заказы")
    public List<OrderResponse> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    @Operation(summary = "Получить заказ по ID")
    public OrderResponse one(@PathVariable Long id){
        return service.findById(id);
    }

    @PostMapping
    @Operation(summary = "Создать новый заказ")
    public OrderResponse create(@RequestBody @Valid CreateOrderRequest req){
        return service.create(req); 
    }
}
