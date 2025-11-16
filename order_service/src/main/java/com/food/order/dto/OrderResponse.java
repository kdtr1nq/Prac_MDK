package com.food.order.dto;

import com.food.order.model.Order;
import com.food.order.model.OrderItem;
import com.food.order.model.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        String customerName,
        String deliveryAddress,
        PaymentMethod paymentMethod,
        LocalDateTime createdAt,
        List<Item> items
) {
    public static OrderResponse fromEntity(Order o) {
        List<Item> mapped = o.getItems().stream()
                .map(OrderResponse::mapItem)
                .toList();
        return new OrderResponse(
                o.getId(),
                o.getCustomerName(),
                o.getDeliveryAddress(),
                o.getPaymentMethod(),
                o.getCreatedAt(),
                mapped
        );
    }

    private static Item mapItem(OrderItem i) {
        return new Item(i.getDishId(), i.getDishName(), i.getPrice(), i.getQuantity());
    }

    /** Позиция заказа */
    public record Item(Long dishId, String dishName, BigDecimal price, int quantity) {}
}
