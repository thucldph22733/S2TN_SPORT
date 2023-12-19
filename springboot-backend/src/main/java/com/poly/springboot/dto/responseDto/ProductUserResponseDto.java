package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public interface ProductUserResponseDto {
    Long getId();
    String getProductName();
    String getImageUrl();
    Double getMinPrice();
}
