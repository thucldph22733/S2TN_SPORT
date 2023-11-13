package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;
import com.poly.springboot.service.StaffService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Validated
@Tag(name = "Staffs",description = "( Rest API Hiển thị, thêm, sửa, xóa, tìm kiếm, phân trang nhân viên )")
@RequestMapping("/api/staffs/")
public class StaffController {

    @Autowired
    private StaffService staffService;

//    @GetMapping("getAll")
//    public ResponseEntity<List<StaffResponseDto>> getStaffs(){
//        List<StaffResponseDto> staffResponseDtoList = staffService.getStaffs();
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(staffResponseDtoList);
//    }

    @GetMapping("pagination")
    public ResponseEntity<List<StaffResponseDto>> getPagination(@RequestParam Optional<Integer> pageNo){
        List<StaffResponseDto> staffResponseDtoList = staffService.getPagination(pageNo.orElse(0));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(staffResponseDtoList);
    }

    @GetMapping("search")
    public ResponseEntity<List<StaffResponseDto>> searchStaff(@RequestParam Optional<Integer> pageNo,@RequestParam String keyword){
        List<StaffResponseDto> staffResponseDtoList = staffService.searchStaff(keyword,pageNo.orElse(0));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(staffResponseDtoList);
    }

//    @PostMapping("create")
//    public ResponseEntity<ResponseDto> createStaff(@RequestBody StaffRequestDto staffRequestDto){
//        Boolean isCreated = staffService.createStaff(staffRequestDto);
//        if (isCreated){
//            return ResponseEntity
//                    .status(HttpStatus.CREATED)
//                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
//        }else {
//            return ResponseEntity
//                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
//        }
//    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateStaff(@Valid @RequestBody StaffRequestDto staffRequestDto, @RequestParam Long id){
        Boolean isUpdated = staffService.updateStaff(staffRequestDto,id);
        if (isUpdated){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteStaff(@RequestParam Long id){
        Boolean isDeleted = staffService.deleteStaff(id);
        if (isDeleted){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
}
