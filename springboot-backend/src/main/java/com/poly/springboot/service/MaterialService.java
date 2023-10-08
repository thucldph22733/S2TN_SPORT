package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.entity.Club;
import com.poly.springboot.entity.Color;
import com.poly.springboot.entity.Material;

import java.util.List;

public interface MaterialService {
    List<Material> findAll();

    List<Material> getPage(Integer pageNo);

    String delete(Long id);

    Material findById(Long id);

    Material save(MaterialRequestDto materialRequestDto);

    Material update(MaterialRequestDto materialRequestDto,Long id);
}
