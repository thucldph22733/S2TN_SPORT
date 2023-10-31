package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.entity.Material;

import java.util.List;

public interface MaterialService {
    List<Material> getMaterials();

    Boolean deleteMaterial(Long id);

    Boolean createMaterial(MaterialRequestDto materialRequestDto);

    Boolean updateMaterial(MaterialRequestDto materialRequestDto,Long id);
}
