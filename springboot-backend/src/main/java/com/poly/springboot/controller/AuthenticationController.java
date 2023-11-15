package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.AuthenticationRequestDto;
import com.poly.springboot.dto.responseDto.AuthenticationResponseDto;
import com.poly.springboot.service.StaffService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/auth/")
public class AuthenticationController {

    @Autowired
    private StaffService staffService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> authenticate(
            @RequestBody AuthenticationRequestDto requestDto
    ) {
        AuthenticationResponseDto responseDto = staffService.loginStaff(requestDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseDto);
    }
    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        staffService.refreshToken(request, response);
    }
}
