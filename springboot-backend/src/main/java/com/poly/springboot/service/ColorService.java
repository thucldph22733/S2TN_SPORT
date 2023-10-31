package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.entity.Color;

import java.util.List;

public interface ColorService {
    List<Color> getColors();

    Boolean deleteColor(Long id);

    Boolean createColor(ColorRequestDto colorRequestDto);

    Boolean updateColor(ColorRequestDto colorRequestDto,Long id);
}
