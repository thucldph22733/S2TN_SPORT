package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.LoginRequestDto;
import com.poly.springboot.dto.requestDto.RefreshTokenRequestDto;
import com.poly.springboot.dto.requestDto.RegisterRequestDto;
import com.poly.springboot.dto.responseDto.JwtAuthenticationResponseDto;
import com.poly.springboot.dto.responseDto.RegisterResponseDto;
import com.poly.springboot.entity.User;
import com.poly.springboot.service.AuthenticationService;


import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth/")
@Tag(name = "Authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(
            @RequestBody RegisterRequestDto registerRequestDto
    ) {
        RegisterResponseDto registerResponseDto = authenticationService.register(registerRequestDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(registerResponseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponseDto> login(
            @RequestBody LoginRequestDto loginRequestDto
    ) {
        JwtAuthenticationResponseDto  jwtAuthenticationResponseDto= authenticationService.login(loginRequestDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(jwtAuthenticationResponseDto);
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<JwtAuthenticationResponseDto> refreshToken( @RequestBody RefreshTokenRequestDto refreshTokenRequestDto
    ) {
        JwtAuthenticationResponseDto  jwtAuthenticationResponseDto= authenticationService.refreshToken(refreshTokenRequestDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(jwtAuthenticationResponseDto);
    }
}
