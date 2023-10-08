package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.entity.Club;
import com.poly.springboot.entity.Color;

import java.util.List;

public interface ColorService {
    List<Color> findAll();

    List<Color> getPage(Integer pageNo);

    String delete(Long id);

    Color findById(Long id);

    Color sava(ColorRequestDto colorRequestDto);

    Color update(ColorRequestDto colorRequestDto,Long id);
}
