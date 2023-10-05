package com.poly.springboot.service;

import com.poly.springboot.dto.responseDto.BrandResponseDto;

import java.util.List;

public interface BrandService {
    List<BrandResponseDto> getBrands();

    List<BrandResponseDto> getPage(Integer pageNo);

}
