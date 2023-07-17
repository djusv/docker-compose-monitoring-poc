package com.example.demo;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantController {

    @Autowired
    private RestaurantRepository repository;

    @GetMapping(path = "/restaurants", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Restaurant> handleRequest() {
      var iterable = repository.findAll();
      return StreamSupport.stream(iterable.spliterator(), false).collect(Collectors.toList());
    }

}
