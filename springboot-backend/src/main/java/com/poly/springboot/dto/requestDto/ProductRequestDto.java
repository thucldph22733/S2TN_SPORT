package com.poly.springboot.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank(message = "Tên sản phẩm không được để trống!")
    private String productName;

    @NotBlank(message = "Ảnh sản phẩm không được để trống!")
    private String productAvatar;

    private Integer productHot;

    private Integer productSale;

    private Integer productNew;

    private Integer viewCount;

    private String productDescribe;

    private Integer status;

    @NotBlank(message = "Tên người tạo không được để trống!")
    private String createBy;

    @NotEmpty(message = "Tên người sửa không được để trống!")
    private  String updateBy;
}
