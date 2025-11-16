package com.food.catalog.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record UpdateDishRequest(
        @NotBlank @Size(max = 120) String name,
        @NotNull  @Digits(integer = 10, fraction = 2) @Positive BigDecimal price,
        @NotBlank @Size(max = 60)  String category
) {}
