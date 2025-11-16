package com.food.order.controller;

import com.food.order.dto.CreateOrderRequest;
import com.food.order.model.Order;
import com.food.order.service.OrderService;
import com.food.order.dto.OrderResponse;


import jakarta.validation.Valid;                    // <-- важно: jakarta, не javax
import org.springframework.web.bind.annotation.*;  // RestController, RequestMapping, GetMapping, PostMapping, PathVariable, RequestBody

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service){ this.service = service; }

    @GetMapping
    public List<OrderResponse> all(){ return service.findAll(); }

    @GetMapping("/{id}")
    public OrderResponse one(@PathVariable Long id){ return service.findById(id); }

    @PostMapping
    public OrderResponse create(@RequestBody @Valid CreateOrderRequest req){ return service.create(req); }
}
