package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.BrandRepository;
import com.poly.springboot.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public Page<Brand> getBrands(String name, List<Boolean> status, Pageable pageable) {

        Page<Brand> brandList;

        if (name == null && status == null){
            brandList = brandRepository.findAll(pageable);
        }else if (name == null){
            brandList = brandRepository.findByDeletedIn(status,pageable);
        }else if (status == null){
            brandList = brandRepository.findByBrandNameContaining(name,pageable);
        }else {
            brandList = brandRepository.findByBrandNameContainingAndDeletedIn(name,status,pageable);
        }
        return brandList;
    }

    @Override
    public Boolean createBrand(BrandRequestDto brandRequestDto) {
        Brand brand = new Brand();

        brand.setBrandDescribe(brandRequestDto.getBrandDescribe());
        brand.setBrandName(brandRequestDto.getBrandName());
        brand.setDeleted(brandRequestDto.getDeleted());

        if (brandRepository.existsByBrandName(brandRequestDto.getBrandName())){
            throw  new AlreadyExistsException("Tên thương hiệu đã tồn tại!");
        }

        brandRepository.save(brand);
        return true;
    }

    @Override
    public Boolean deleteBrand(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(()->  new ResourceNotFoundException("Không tìm thấy id thương hiệu này!"));

        brand.setDeleted(!brand.getDeleted());

        brandRepository.save(brand);
        return true;
    }


    @Override
    public Boolean updateBrand(BrandRequestDto brandRequestDto, Long id) {
        Brand brand = brandRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Không tìm thấy id thương hiệu này!"));
        brand.setBrandName(brandRequestDto.getBrandName());
        brand.setBrandDescribe(brandRequestDto.getBrandDescribe());
        brand.setDeleted(brandRequestDto.getDeleted());
        brandRepository.save(brand);

        return true;
    }

    @Override
    public List<Brand> findAllByDeletedTrue() {
        return brandRepository.findAllByDeletedTrue();
    }
}
