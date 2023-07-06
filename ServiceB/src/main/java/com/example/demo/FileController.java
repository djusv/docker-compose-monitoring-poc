package com.example.demo;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileController {

  @Autowired
  FileStorageService storageService;

  @PostMapping("/upload")
  public ResponseEntity<?> uploadFiles(@RequestParam("files") MultipartFile[] files) {
    try {
      Arrays.asList(files).stream().forEach(file -> {
        storageService.save(file);
      });
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }
  }
}
