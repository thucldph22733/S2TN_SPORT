package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CategoryVoucherRequestDto;
import com.poly.springboot.dto.responseDto.CategoryVoucherResponseDto;
import com.poly.springboot.entity.CategoryVoucher;

import java.util.List;

public interface CategoryVoucherService {
    List<CategoryVoucherResponseDto> getCategoryVoucher();

    CategoryVoucher saveCategoryVoucher(CategoryVoucherRequestDto requestDto);

    CategoryVoucher updateCategoryVoucher(CategoryVoucherRequestDto requestDto,Long id);

    String delete(Long id);

    CategoryVoucher findCategoryVoucherById(Long id);

}