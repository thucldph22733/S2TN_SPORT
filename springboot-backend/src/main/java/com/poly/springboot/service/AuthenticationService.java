package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.LoginRequestDto;
import com.poly.springboot.dto.requestDto.RefreshTokenRequestDto;
import com.poly.springboot.dto.requestDto.RegisterRequestDto;
import com.poly.springboot.dto.responseDto.JwtAuthenticationResponseDto;
import com.poly.springboot.dto.responseDto.RegisterResponseDto;

public interface AuthenticationService {

    RegisterResponseDto register(RegisterRequestDto registerRequestDto);

    JwtAuthenticationResponseDto login(LoginRequestDto loginRequestDto);

    JwtAuthenticationResponseDto refreshToken(RefreshTokenRequestDto refreshTokenRequestDto);
}
