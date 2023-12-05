package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.entity.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BrandService {
    Page<Brand> getBrands(String name, List<Boolean> status, Pageable pageable);

    Boolean createBrand(BrandRequestDto brandRequestDto);

    Boolean deleteBrand(Long id);

    Boolean updateBrand(BrandRequestDto brandRequestDto,Long id);

    List<Brand> findAllByDeletedTrue();

}
