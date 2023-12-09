package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.entity.Material;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.MaterialRepository;
import com.poly.springboot.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Override
    public Page<Material> getMaterials(String name, List<Boolean> status, Pageable pageable) {

        Page<Material> MaterialList;

        if (name == null && status == null) {
            MaterialList = materialRepository.findAll(pageable);
        } else if (name == null) {
            MaterialList = materialRepository.findByDeletedIn(status, pageable);
        } else if (status == null) {
            MaterialList = materialRepository.findByMaterialNameContaining(name, pageable);
        } else {
            MaterialList = materialRepository.findByMaterialNameContainingAndDeletedIn(name, status, pageable);
        }
        return MaterialList;
    }

    @Override
    public List<Material> findAllByDeletedTrue() {
        return materialRepository.findAllByDeletedTrue();
    }


    @Override
    public Boolean deleteMaterial(Long id) {
        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id chất liệu này!"));

        material.setDeleted(!material.getDeleted());

        materialRepository.save(material);

        return true;
    }


    @Override
    public Boolean createMaterial(MaterialRequestDto materialRequestDto) {

        Material material = new Material();

        material.setMaterialDescribe(materialRequestDto.getMaterialDescribe());
        material.setMaterialName(materialRequestDto.getMaterialName());
        material.setDeleted(materialRequestDto.getDeleted());
        if (materialRepository.existsByMaterialName(materialRequestDto.getMaterialName())) {
            throw new AlreadyExistsException("Tên chất liệu đã tồn tại");
        }

        materialRepository.save(material);

        return true;
    }

    @Override
    public Boolean updateMaterial(MaterialRequestDto materialRequestDto, Long id) {

        Material material = materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id chất liệu này!"));

        material.setMaterialName(materialRequestDto.getMaterialName());
        material.setMaterialDescribe(materialRequestDto.getMaterialDescribe());
        material.setDeleted(materialRequestDto.getDeleted());

        materialRepository.save(material);

        return true;
    }
}
