package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.entity.Size;

import java.util.List;

public interface SizeService {
    List<Size> getSizes();

    Boolean deleteSize(Long id);


    Boolean createSize(SizeRequestDto sizeRequestDto);

    Boolean updateSize(SizeRequestDto sizeRequestDto,Long id);
}
