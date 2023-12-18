package com.poly.springboot.dto.requestDto;

import com.poly.springboot.entity.Product;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageRequestDto {

    private Long productId;

    private Long colorId;

//    @NotBlank(message = "Tên ảnh không được để trống!")
    private String imageName;

//    @NotBlank(message = "Đường dẫn ảnh không được để trống!")
    private String imageLink;

    private String imageType;

}
