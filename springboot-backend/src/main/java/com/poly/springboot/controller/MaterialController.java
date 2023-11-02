package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Material;
import com.poly.springboot.service.MaterialService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/materials/")
@Tag(name = "Materials",description = "( Rest API Hiển thị, thêm, sửa, xóa chất liệu )")
@Validated
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping("getAll")
    public ResponseEntity<List<Material>> getMaterials() {
        List<Material> materialList = materialService.getMaterials();
        return ResponseEntity.
                status(HttpStatus.OK)
                .body(materialList);

    }



    @PostMapping("create")
    public ResponseEntity<ResponseDto>createMaterial(@Valid @RequestBody MaterialRequestDto materialRequestDto){
        Boolean isCreated = materialService.createMaterial(materialRequestDto);

        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.STATUS_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateMaterial(@Valid @RequestBody MaterialRequestDto materialRequestDto,@RequestParam Long id){
        Boolean isUpdated = materialService.updateMaterial(materialRequestDto,id);
        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.STATUS_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteMaterial(@RequestParam Long id){

        Boolean isDeleted = materialService.deleteMaterial(id);
        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.STATUS_500));
        }
    }

}
