package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {

    private Long id;

    private String productName;

    private String categoryName;

    private String brandName;

    private String supplierName;

    private  Boolean deleted;

    private LocalDateTime createdAt;

    private String createdBy;

    private String productDescribe;


}
