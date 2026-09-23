package com.inventory.app.service;

import com.inventory.app.model.Movement;
import com.inventory.app.model.MovementType;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.List;
@Service
@RequiredArgsConstructor
public class MovementService {

    private final ObjectMapper objectMapper;

    public List<Movement> getMovements(LocalDate from, LocalDate to, MovementType type) {
        if (from.isAfter(to)) {
            throw new IllegalArgumentException("'from' date cannot be after 'to' date");
        }

        List<Movement> movements = readMovements();

        return movements.stream()
                .filter(movement ->
                        isWithinDateRange(movement, from, to))
                .filter(movement ->
                        type == null || movement.getMovementType() == type)
                .toList();
    }

    private boolean isWithinDateRange(Movement movement, LocalDate from, LocalDate to) {
        LocalDate movementDate = movement.getTimestamp()
                                    .atZone(java.time.ZoneOffset.UTC)
                                    .toLocalDate();

        return !movementDate.isBefore(from) && !movementDate.isAfter(to);
    }

    private List<Movement> readMovements() {
        try {
            ClassPathResource resource = new ClassPathResource("data/movements.json");

            try (InputStream inputStream = resource.getInputStream()) {

                return objectMapper.readValue(
                        inputStream,
                        new TypeReference<List<Movement>>() {}
                );
            }

        } catch (IOException e) {
            throw new RuntimeException(
                    "Unable to read movement data",
                    e
            );
        }
    }
}
