package com.poly.springboot.dto.responseDto;

import com.poly.springboot.entity.CategoryVoucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryVoucherResponseDto {
    private Long id;
    private String categoryName;
    private String categoryDescribe;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
