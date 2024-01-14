package com.poly.springboot.dto.responseDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterResponseDto {

    private Long id;

    private  String productImage;

    private String productName;

    private String categoryName;

    private String brandName;

    private String supplierName;

    private String productDescribe;

    private  Long quantityTotal;

    private Boolean deleted;

    private LocalDateTime createdAt;

    private String createdBy;
}
