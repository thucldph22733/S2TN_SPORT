package com.poly.springboot.dto.responseDto;


//import com.poly.springboot.entity.Role;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

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

    private LocalDateTime createdAt;

}
