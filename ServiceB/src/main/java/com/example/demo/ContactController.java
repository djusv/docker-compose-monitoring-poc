package com.example.demo;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

    @Autowired
    private ContactRepository repository;

    @GetMapping(path = "/contacts", produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Contact> handleRequest() {
      var iterable = repository.findAll();
      return StreamSupport.stream(iterable.spliterator(), false).collect(Collectors.toList());
    }

}
