package com.example.demo;

public class JwtRequestModel {
    private String name;

    public JwtRequestModel() {}

    public JwtRequestModel(String name) {
      this.name = name;
    }

    public void setName(String name) {
      this.name = name;
    }

    public String getName() {
      return name;
    }
}
