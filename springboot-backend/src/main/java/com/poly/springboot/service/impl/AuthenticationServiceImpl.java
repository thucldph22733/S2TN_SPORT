package com.poly.springboot.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.springboot.config.JwtService;
import com.poly.springboot.dto.requestDto.AuthenticationRequestDto;
import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.AuthenticationResponseDto;
import com.poly.springboot.entity.Staff;
import com.poly.springboot.entity.Token;
import com.poly.springboot.entity.TokenType;
import com.poly.springboot.repository.StaffRepository;
import com.poly.springboot.repository.TokenRepository;
import com.poly.springboot.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private  StaffRepository staffRepository;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private  JwtService jwtService;
    @Autowired
    private  AuthenticationManager authenticationManager;
    @Autowired
    private  PasswordEncoder passwordEncoder;

//    public AuthenticationServiceImpl(PasswordEncoder passwordEncoder) {
//        this.passwordEncoder = passwordEncoder;
//    }

    @Override
    public AuthenticationResponseDto register(StaffRequestDto staffRequestDto) {
        var staff = Staff.builder()
                .staffName(staffRequestDto.getStaffName())
                .avatar(staffRequestDto.getAvatar())
                .phoneNumber(staffRequestDto.getPhoneNumber())
                .email(staffRequestDto.getEmail())
                .gender(staffRequestDto.getGender())
                .birthOfDay(staffRequestDto.getBirthOfDay())
                .address(staffRequestDto.getAddress())
                .password(passwordEncoder.encode(staffRequestDto.getPassword()))
                .status(true)
                .build();
        var savedUser = staffRepository.save(staff);;
        var jwtToken = jwtService.generateToken(staff);
        var refreshToken = jwtService.generateRefreshToken(staff);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponseDto.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AuthenticationResponseDto authenticate(AuthenticationRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = staffRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponseDto.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.staffRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);
                var authResponse = AuthenticationResponseDto.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }
    }

    private void saveUserToken(Staff staff, String jwtToken) {
        var token = Token.builder()
                .staff(staff)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Staff staff) {
        var validUserTokens = tokenRepository.findAllValidTokenByStaff(staff.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
