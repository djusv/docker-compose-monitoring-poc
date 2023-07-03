package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MetadataController {

  @GetMapping("/metadata")
  @ResponseBody
  public Metadata getMetadata() {
    return new Metadata("serviceB");
  }
}
