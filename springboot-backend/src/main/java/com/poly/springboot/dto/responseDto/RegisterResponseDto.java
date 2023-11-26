package com.poly.springboot.dto.responseDto;


import java.util.List;

public record RegisterResponseDto(
        String userName,
        String email,
        String phoneNumber,
        String password,
        List<String> roles) {

}