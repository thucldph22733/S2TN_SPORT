package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Size;
import com.poly.springboot.service.SizeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/sizes/")
@Tag(name = "Sizes",description = "( Rest API Hiển thị, thêm, sửa, xóa kích thước )")
@Validated
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping("getAll")
    public ResponseEntity<List<Size>> getSizes() {
        List<Size> sizeList = sizeService.getSizes();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(sizeList);

    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto> createSize(@Valid @RequestBody SizeRequestDto sizeRequestDto){
        Boolean isCreated = sizeService.createSize(sizeRequestDto);

        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateSize(@Valid @RequestBody SizeRequestDto sizeRequestDto, @RequestParam Long id){
        Boolean isUpdated = sizeService.updateSize(sizeRequestDto,id);

        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteSize(@RequestParam Long id){
        Boolean isDeleted = sizeService.deleteSize(id);

        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

}
