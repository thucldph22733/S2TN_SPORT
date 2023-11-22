package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.BrandRequestDto;

import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Brand;
import com.poly.springboot.service.BrandService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Validated
@RequestMapping("/api/v1/brands/")
@Tag(name = "Brands",description = "( Rest API Hiển thị, thêm, sửa, xóa thương hiệu )")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("getAll")
    public ResponseEntity<List<Brand>> getBrands(@RequestParam Integer pageNo,
                                                 @RequestParam Integer pageSize,
                                                 @RequestParam(required = false) String name,
                                                 @RequestParam(required = false) List<Boolean> status) {
        Pageable pageable = PageRequest.of(pageNo-1,pageSize);
        List<Brand> brandList = brandService.getBrands(name,status,pageable).getContent();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(brandList);
    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto> createBrand(@Valid @RequestBody BrandRequestDto brandRequestDto) {
        Boolean isCreated = brandService.createBrand(brandRequestDto);
        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateBrand(@Valid @RequestBody BrandRequestDto brandRequestDto, @RequestParam Long id) {
        Boolean isUpdated = brandService.updateBrand(brandRequestDto, id);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteBrand(@RequestParam Long id) {
        Boolean isDelete = brandService.deleteBrand(id);
        if (isDelete) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }
}
