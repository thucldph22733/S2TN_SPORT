package com.poly.springboot.dto.requestDto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record RegisterRequestDto(
        String userName,

        String email,
        String phoneNumber,
        String password,
        @JsonProperty("roles") List<String> roles)
{

}
