package com.poly.springboot.dto.requestDto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationRequestDto {

    private String email;

    private String password;
}
