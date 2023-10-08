package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.BrandRequestDto;
import com.poly.springboot.dto.requestDto.ShipperRequestDto;
import com.poly.springboot.dto.responseDto.BrandResponseDto;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping("brand")
    public ResponseEntity<List<BrandResponseDto>> getBrand() {
        List<BrandResponseDto> brandResponseDtoList = brandService.getBrands();
        return ResponseEntity.ok(brandResponseDtoList);
    }

    @GetMapping("brand/{id}")
    public ResponseEntity<Brand> findById(@PathVariable Long id) {
        Brand brand = brandService.findBrandById(id);
        return ResponseEntity.ok(brand);
    }

    @PostMapping("create-brand")
    public ResponseEntity<Brand> createBrand(@RequestBody BrandRequestDto brandRequestDto) {
        Brand brand = brandService.saveBrand(brandRequestDto);
        return ResponseEntity.ok(brand);
    }

    @PutMapping("update-brand/{id}")
    public ResponseEntity<Brand> updateBrand(@RequestBody BrandRequestDto brandRequestDto, @PathVariable Long id) {
        Brand brand = brandService.updateBrand(brandRequestDto, id);
        return ResponseEntity.ok(brand);
    }

    @DeleteMapping("delete-brand/{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable Long id) {
        String messege = brandService.deleteBrand(id);
        return ResponseEntity.ok(messege);
    }
}
