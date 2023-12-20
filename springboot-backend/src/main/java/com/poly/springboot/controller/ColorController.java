package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.entity.Color;
import com.poly.springboot.entity.Color;
import com.poly.springboot.service.ColorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/colors/")
@Tag(name = "Colors",description = "( Rest API Hiển thị, thêm, sửa, xóa màu sắc )")
@Validated
public class ColorController {
    @Autowired
    private ColorService colorService;


    @GetMapping("getAll")
    public ResponseEntity<?> getColors(@RequestParam(defaultValue = "0") Integer pageNo,
                                          @RequestParam(defaultValue = "10") Integer pageSize,
                                          @RequestParam(required = false) String name,
                                          @RequestParam(required = false) List<Boolean> status) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Color> ColorPage = colorService.getColors(name, status, pageable);
        List<Color> ColorList = ColorPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        ColorList,
                        ColorPage);
    }
    @GetMapping("findAllByDeletedTrue")
    public ResponseEntity<?> findAllByDeletedTrue() {

        List<Color> colorList = colorService.findAllByDeletedTrue();

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

    @DeleteMapping("delete")
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
