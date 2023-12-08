package com.poly.springboot.dto.responseDto;


import com.poly.springboot.entity.Role;


public record RegisterResponseDto(
        String userName,
        String email,
        String phoneNumber,
        String password,
        Role role) {

}