package com.food.order.dto;

import com.food.order.model.PaymentMethod;
import jakarta.validation.constraints.*;
import java.util.List;

public record CreateOrderRequest(
        @NotBlank String customerName,
        @NotBlank String deliveryAddress,
        @NotNull PaymentMethod paymentMethod,
        @Size(min = 1) List<OrderItemRequest> items
) {}
