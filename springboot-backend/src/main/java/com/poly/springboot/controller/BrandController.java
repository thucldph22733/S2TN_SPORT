package com.poly.springboot.controller;

import com.poly.springboot.dto.responseDto.BrandResponseDto;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping("brand")
    public ResponseEntity<List<BrandResponseDto>> getBrand(){
        List<BrandResponseDto>brandResponseDtoList =brandService.getBrands();
        return  new ResponseEntity<>(brandResponseDtoList, HttpStatus.OK);
    }
}
