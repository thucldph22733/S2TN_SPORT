package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RoleRequestDto {

    @NotBlank(message = "Tên vai trò không được để trống!")
    private String roleName;

    private String roleDescribe;

}
