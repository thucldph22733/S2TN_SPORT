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

//    private Role role;

    private String userName;

    private String avatar;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private Date birthOfDay;

    private String address;

    private Boolean status;

    private LocalDateTime createDate;

}
