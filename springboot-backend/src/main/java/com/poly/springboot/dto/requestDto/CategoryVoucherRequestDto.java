package com.poly.springboot.dto.requestDto;

import com.poly.springboot.entity.CategoryVoucher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CategoryVoucherRequestDto {
    private String categoryName;
    private String categoryDescribe;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

}
