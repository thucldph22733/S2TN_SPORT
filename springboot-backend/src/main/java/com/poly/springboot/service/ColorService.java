package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.entity.Color;
import com.poly.springboot.entity.Color;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ColorService {
    Page<Color> getColors(String name, List<Boolean> status, Pageable pageable);

    Boolean deleteColor(Long id);

    Boolean createColor(ColorRequestDto colorRequestDto);

    Boolean updateColor(ColorRequestDto colorRequestDto,Long id);

    List<Color> findAllByDeletedTrue();
}
