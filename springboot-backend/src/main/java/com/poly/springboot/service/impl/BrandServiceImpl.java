package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.dto.responseDto.BrandResponseDto;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.repository.BrandRepository;
import com.poly.springboot.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<BrandResponseDto> getBrands() {
        return brandRepository.findAll().stream().map(brand -> {
            BrandResponseDto brandResponseDto = new BrandResponseDto();
            brandResponseDto.setId(brand.getId());
            brandResponseDto.setBrandName(brand.getBrandName());
            brandResponseDto.setBrandDescribe(brand.getBrandDescribe());
            return brandResponseDto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<BrandResponseDto> getPage(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 5);
        List<BrandResponseDto> brandResponseDtoList = brandRepository.findAll(pageable)
                .stream().map(brand -> new BrandResponseDto(
                        brand.getId(),
                        brand.getBrandName(),
                        brand.getBrandDescribe()
                )).collect(Collectors.toList());
        return brandResponseDtoList;
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
    public String deletBrand(Long id) {
        if (brandRepository.existsById(id)) {
            brandRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public Brand getBrand(Long id) {
        Optional<Brand> result = brandRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Brand updateBrand(BrandRequestDto brandRequestDto, Long id) {
        Brand newBrand = brandRepository.findById(id).get();
        newBrand.setBrandDescribe(brandRequestDto.getBrandDescribe());
        newBrand.setBrandName(brandRequestDto.getBrandName());
        return brandRepository.save(newBrand);
    }
}
