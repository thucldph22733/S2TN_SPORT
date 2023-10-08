package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.entity.Club;
import com.poly.springboot.entity.Material;
import com.poly.springboot.repository.MaterialRepository;
import com.poly.springboot.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Override
    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    @Override
    public List<Material> getPage(Integer pageNo) {
        return null;
    }

    @Override
    public String delete(Long id) {
        if (materialRepository.existsById(id)){
            materialRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public Material findById(Long id) {
        Optional<Material> result = materialRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Material save(MaterialRequestDto materialRequestDto) {
         Material material = new Material();
         material.setMaterialDescribe(materialRequestDto.getMaterialDescribe());
         material.setMaterialName(materialRequestDto.getMaterialName());
         materialRepository.save(material);
         return material;
    }

    @Override
    public Material update(MaterialRequestDto materialRequestDto, Long id) {
        Material material = materialRepository.findById(id).get();
        material.setMaterialName(materialRequestDto.getMaterialName());
        material.setMaterialDescribe(materialRequestDto.getMaterialDescribe());
        materialRepository.save(material);
        return material;
    }
}
