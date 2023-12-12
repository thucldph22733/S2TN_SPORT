package com.poly.springboot.dto.responseDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponseDto {

    private Long id;

    private Long idOrder;

    private Long idProductDetail;

//    private String productAvatar;

    private String colorName;

    private String sizeName;

    private String productName;

    private Integer quantity;

    private Double price;

    private Double priceSecond;

    private Double orderTotal;

    private String note;
}
