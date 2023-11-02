package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusRequestDto {

    @NotBlank(message = "Tên trạng thái không được để trống!")
    private String statusName;

    private String statusDescribe;
}
