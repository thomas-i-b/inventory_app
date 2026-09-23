package com.inventory.app.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Movement {

    private String id;

    private Instant timestamp;

    private String sku;

    @JsonProperty("movementType")
    private MovementType movementType;

    private int quantity;
}
