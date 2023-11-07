package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.sql.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponseDto {

    private  Long id;

    private String customerName;

    private String avatar;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private Date birthOfDay;

    private String password;

    private Integer status;

}
