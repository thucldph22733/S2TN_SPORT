package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.entity.Material;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.MaterialRepository;
import com.poly.springboot.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Override
    public List<Material> getMaterials() {
        return materialRepository.findAll();
    }


    @Override
    public Boolean deleteMaterial(Long id) {
        Material material = materialRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy id chất liệu này!"));
        materialRepository.deleteById(material.getId());
        return true;
    }



    @Override
    public Boolean createMaterial(MaterialRequestDto materialRequestDto) {

         Material material = new Material();

         material.setMaterialDescribe(materialRequestDto.getMaterialDescribe());
         material.setMaterialName(materialRequestDto.getMaterialName());

         if (materialRepository.existsByMaterialName(materialRequestDto.getMaterialName())){
             throw new AlreadyExistsException("Tên chất liệu đã tồn tại");
         }
         materialRepository.save(material);
         return true;
    }

    @Override
    public Boolean updateMaterial(MaterialRequestDto materialRequestDto, Long id) {

        Material material = materialRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy id chất liệu này!"));

        material.setMaterialName(materialRequestDto.getMaterialName());
        material.setMaterialDescribe(materialRequestDto.getMaterialDescribe());

        materialRepository.save(material);

        return true;
    }
}
