package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierRequestDto {

    private String supplierName;

    private String email;

    private String phoneNumber;

    private String address;

    private String supplierDescribe;

    private Boolean deleted;
}
