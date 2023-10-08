package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.Size;

import java.util.List;

public interface SizeService {
    List<Size> findAll();

    List<Size> getPage(Integer pageNo);

    String delete(Long id);

    Size findById(Long id);

    Size save(SizeRequestDto sizeRequestDto);

    Size update(SizeRequestDto sizeRequestDto,Long id);
}
