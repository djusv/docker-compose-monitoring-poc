package com.example.demo;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@Document(collection = "restaurants")
public class Restaurant {

  @Id
  private ObjectId _id;
  private long id;
  private String name;
  private String neighborhood;
  private String photograph;
  private String address;
  private Coordinates latlng;
  private String cuisine_type;
  private List<Review> reviews;


  @Getter
  @Setter
  class Coordinates {
    private float lat;
    private float lng;
  }

  @Getter
  @Setter
  class OperatingHours {
    private String Monday;
    private String Tuesday;
    private String Wednesday;
    private String Thursday;
    private String Friday;
    private String Saturday;
    private String Sunday;
  }

  @Getter
  @Setter
  class Review {
    private String name;
    private String date;
    private int rating;
    private String comments;
  }

}
