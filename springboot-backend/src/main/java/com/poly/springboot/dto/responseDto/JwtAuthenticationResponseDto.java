package com.poly.springboot.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.poly.springboot.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthenticationResponseDto {

    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;

    private Long id;

    private String userName;

    private Role role;
}
