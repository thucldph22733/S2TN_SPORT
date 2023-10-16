package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.entity.Brand;
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
    public Brand saveBrand(BrandRequestDto brandRequestDto) {
        Brand brand = new Brand();
        brand.setBrandDescribe(brandRequestDto.getBrandDescribe());
        brand.setBrandName(brandRequestDto.getBrandName());
        brandRepository.save(brand);
        return brand;
    }

    @Override
    public String deleteBrand(Long id) {
        if (brandRepository.existsById(id)) {
            brandRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public Brand findBrandById(Long id) {

        //Tim id chuyen vao
        Optional<Brand> result = brandRepository.findById(id);

        //Neu thay tra ve brand do
        //Neu ko tra ve null
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Brand updateBrand(BrandRequestDto brandRequestDto, Long id) {
        Brand newBrand = brandRepository.findById(id).get();

        newBrand.setBrandName(brandRequestDto.getBrandName());
        newBrand.setBrandDescribe(brandRequestDto.getBrandDescribe());
        brandRepository.save(newBrand);
        return newBrand;
    }
}
