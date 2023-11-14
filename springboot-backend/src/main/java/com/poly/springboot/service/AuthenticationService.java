package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.AuthenticationRequestDto;
import com.poly.springboot.dto.responseDto.AuthenticationResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {

    AuthenticationResponseDto authenticate(AuthenticationRequestDto request);
    void refreshToken(HttpServletRequest request, HttpServletResponse response);
}
