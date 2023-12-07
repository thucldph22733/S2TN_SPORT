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

    @NotBlank(message = "Tên nhà sản xuất không được để trống!")
    private String supplierName;

    @NotBlank(message = "Địa chỉ email không được để trống!")
    @Email(message = "Địa chỉ email không đúng định dạng!")
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống!")
    private String phoneNumber;

    @NotBlank(message = "Địa chỉ không được để trống!")
    private String address;

    private String supplierDescribe;

    private Boolean deleted;
}
