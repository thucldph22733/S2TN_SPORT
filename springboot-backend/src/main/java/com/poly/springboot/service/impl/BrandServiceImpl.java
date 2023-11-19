package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.BrandRepository;
import com.poly.springboot.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> getBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Boolean createBrand(BrandRequestDto brandRequestDto) {
        Brand brand = new Brand();

        brand.setBrandDescribe(brandRequestDto.getBrandDescribe());
        brand.setBrandName(brandRequestDto.getBrandName());

        if (brandRepository.existsByBrandName(brandRequestDto.getBrandName())){
            throw  new AlreadyExistsException("Tên thương hiệu đã tồn tại!");
        }

        brandRepository.save(brand);
        return true;
    }

    @Override
    public Boolean deleteBrand(Long id) {
        if (brandRepository.existsById(id)){
           throw  new ResourceNotFoundException("Không tìm thấy id thương hiệu này!");
        }
        brandRepository.deleteById(brand.getId());
        return true;
    }


    @Override
    public Boolean updateBrand(BrandRequestDto brandRequestDto, Long id) {
        Brand brand = brandRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Không tìm thấy id thương hiệu này!"));
        brand.setBrandName(brandRequestDto.getBrandName());
        brand.setBrandDescribe(brandRequestDto.getBrandDescribe());
        brandRepository.save(brand);

        return true;
    }
}
