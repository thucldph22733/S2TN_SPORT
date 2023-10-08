package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequestDto {

    private Long categoryId;

    private Long clubId;

    private Long brandId;

    private Long supplierId;

    @NotBlank(message = "Không được để trống!")
    private String productName;

    @NotBlank(message = "Không được để trống!")
    private String productAvatar;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private Integer productHot;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private Integer productSale;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private Integer productNew;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private Integer viewCount;

    @NotBlank(message = "Không được để trống!")
    private String productDescribe;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private Integer isDefault;

    @NotBlank(message = "Không được để trống!")
    private String createBy;

    @NotEmpty(message = "Vui lòng Không để trống!")
    private  String updateBy;
}
