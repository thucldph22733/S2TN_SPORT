package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.entity.Brand;

import java.util.List;

public interface BrandService {
    List<Brand> getBrands();

    Boolean createBrand(BrandRequestDto brandRequestDto);

    Boolean deleteBrand(Long id);

    Boolean updateBrand(BrandRequestDto brandRequestDto,Long id);

}
