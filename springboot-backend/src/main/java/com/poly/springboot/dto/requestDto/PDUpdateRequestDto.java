package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PDUpdateRequestDto {
    private Long productId;

    private Long sizeId;

    private Long materialId;

    private Long colorId;
}
