package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Color;
import com.poly.springboot.service.ColorService;
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
@RequestMapping("/api/colors/")
@Tag(name = "Colors",description = "( Rest API Hiển thị, thêm, sửa, xóa màu sắc )")
@Validated
public class ColorController {
    @Autowired
    private ColorService colorService;


    @GetMapping("getAll")
    public ResponseEntity<List<Color>> getColors() {
        List<Color> colorList = colorService.getColors();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(colorList);

    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto> createColor(@Valid @RequestBody ColorRequestDto colorRequestDto) {
        Boolean isCreated = colorService.createColor(colorRequestDto);
        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateColor(@Valid @RequestBody ColorRequestDto colorRequestDto, @RequestParam Long id) {
        Boolean isUpdated = colorService.updateColor(colorRequestDto, id);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("color")
    public ResponseEntity<ResponseDto> deleteColor(@RequestParam Long id) {
        Boolean isDeleted = colorService.deleteColor(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

}
