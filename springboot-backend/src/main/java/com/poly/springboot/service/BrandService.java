package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.dto.responseDto.BrandResponseDto;
import com.poly.springboot.entity.Brand;

import java.util.List;

public interface BrandService {
    List<BrandResponseDto> getBrands();

    List<BrandResponseDto> getPage(Integer pageNo);

    Brand saveBrand(BrandRequestDto brandRequestDto);

    String deleteBrand(Long id);

    Brand findBrandById(Long id);

    Brand updateBrand(BrandRequestDto brandRequestDto,Long id);

}
