package com.poly.springboot.dto.responseDto;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {

    private Long id;

    private String categoryName;

    private String clubName;

    private String brandName;

    private String supplierName;

    private String productName;

    private String productAvatar;

    private Integer productHot;

    private Integer productSale;

    private Integer productNew;

    private Integer viewCount;

    private String productDescribe;

    private Integer isDefault;

    private String createBy;

    private  String updateBy;
}
