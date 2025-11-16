package com.food.order.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record OrderItemRequest(
        @NotNull Long dishId,
        @NotBlank String dishName,
        @Positive BigDecimal price,
        @Min(1) int quantity
) {}
