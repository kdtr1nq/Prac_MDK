package com.food.catalog.service;

import com.food.catalog.dto.*;
import com.food.catalog.model.Dish;
import com.food.catalog.repository.DishRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class DishService {
    private final DishRepository repo;

    public DishService(DishRepository repo) { this.repo = repo; }

    public List<DishResponse> findAll() {
        return repo.findAll().stream().map(this::toRes).toList();
    }

    public DishResponse findById(Long id) {
        return toRes(get(id));
    }

    public DishResponse create(CreateDishRequest r) {
        Dish d = new Dish();
        d.setName(r.name());
        d.setPrice(r.price());
        d.setCategory(r.category());
        return toRes(repo.save(d));
    }

    public DishResponse update(Long id, UpdateDishRequest r) {
        Dish d = get(id);
        d.setName(r.name());
        d.setPrice(r.price());
        d.setCategory(r.category());
        return toRes(repo.save(d));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Dish not found");
        }
        repo.deleteById(id);
    }

    private Dish get(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Dish not found"));
    }

    private DishResponse toRes(Dish d) {
        return new DishResponse(d.getId(), d.getName(), d.getPrice(), d.getCategory());
    }
}
