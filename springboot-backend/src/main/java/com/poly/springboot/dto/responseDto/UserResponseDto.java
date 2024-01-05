package com.poly.springboot.dto.responseDto;


import com.poly.springboot.entity.Role;
import lombok.*;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {

    private Long id;

    private String userName;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private Date birthOfDay;

    private Boolean deleted;

    private Role role;

    private LocalDateTime createdAt;

}
