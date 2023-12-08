package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.entity.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MaterialService {

    Page<Material> getMaterials(String name, List<Boolean> status, Pageable pageable);

    List<Material> findAllByDeletedTrue();
    Boolean deleteMaterial(Long id);

    Boolean createMaterial(MaterialRequestDto materialRequestDto);

    Boolean updateMaterial(MaterialRequestDto materialRequestDto,Long id);
}
