package com.example.demo;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Controller
public class JWTController {

    private SignatureAlgorithm sa = SignatureAlgorithm.HS256;
    private String jwtSecret = System.getenv().getOrDefault("JWT_SECRET", "secret-key");

    @GetMapping("/jwt")
    public ResponseEntity<?> handleRequest(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHdr) {
        String jwtString = authHdr.replace("Bearer","");
        Claims claims = Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(jwtString).getBody();

        return ResponseEntity.ok(claims.get("name").toString());
    }

    @PostMapping(path = "/jwt", consumes = {MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<?> handleRequest(@RequestBody JwtRequestModel request) {
        String jwt = Jwts.builder()
          .claim("name", request.getName())
          .signWith(sa, jwtSecret)
          .compact();
        return ResponseEntity.ok(jwt);
    }

}
