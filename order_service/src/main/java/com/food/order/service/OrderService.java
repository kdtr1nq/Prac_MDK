package com.food.order.service;

import com.food.order.dto.*;
import com.food.order.model.*;
import com.food.order.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository repo;

    public OrderService(OrderRepository repo) { this.repo = repo; }

    public List<OrderResponse> findAll() {
        return repo.findAll().stream().map(this::toRes).toList();
    }

    public OrderResponse findById(Long id) {
        return toRes(repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found")));
    }

    public OrderResponse create(CreateOrderRequest req) {
        Order order = new Order();
        order.setCustomerName(req.customerName());
        order.setDeliveryAddress(req.deliveryAddress());
        order.setPaymentMethod(req.paymentMethod());
        for (OrderItemRequest i : req.items()) {
            OrderItem item = new OrderItem();
            item.setDishId(i.dishId());
            item.setDishName(i.dishName());
            item.setPrice(i.price());
            item.setQuantity(i.quantity());
            item.setOrder(order);
            order.getItems().add(item);
        }
        return toRes(repo.save(order));
    }

    private OrderResponse toRes(Order o) {
        List<OrderResponse.Item> items = o.getItems().stream()
                .map(i -> new OrderResponse.Item(i.getDishId(), i.getDishName(), i.getPrice(), i.getQuantity()))
                .toList();
        return new OrderResponse(
                o.getId(), o.getCustomerName(), o.getDeliveryAddress(),
                o.getPaymentMethod(), o.getCreatedAt(), items
        );
    }
}
