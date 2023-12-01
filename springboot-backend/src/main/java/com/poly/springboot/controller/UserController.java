package com.poly.springboot.controller;


import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import com.poly.springboot.service.UserService;
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


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Validated
@Tag(name = "Users",description = "( Rest API Hiển thị, thêm, sửa, xóa, tìm kiếm, phân trang nhân viên )")
@RequestMapping("/api/v1/users/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("getAll")
    public ResponseEntity<?> getStaffs(@RequestParam(defaultValue = "0") Integer pageNo,
                                                           @RequestParam(defaultValue = "10") Integer pageSize){
        Pageable pageable = PageRequest.of(pageNo,pageSize);

        Page<UserResponseDto>  userResponseDtoPage = userService.getUsers(pageable);

        List<UserResponseDto> userResponseDtoList = userResponseDtoPage.getContent();

        return ResponseHandler.generateResponse(HttpStatus.OK,userResponseDtoList,userResponseDtoPage);
    }



    @PostMapping("create")
    public ResponseEntity<ResponseDto> createStaff(@Valid @RequestBody UserRequestDto userRequestDto){
        Boolean isCreated = userService.createUser(userRequestDto);
        if (isCreated){
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateStaff(@Valid @RequestBody UserRequestDto staffRequestDto, @RequestParam Long id){
        Boolean isUpdated = userService.updateUser(staffRequestDto,id);
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
//
//    @DeleteMapping("delete")
//    public ResponseEntity<ResponseDto> deleteStaff(@RequestParam Long id){
//        Boolean isDeleted = userService .deleteStaff(id);
//        if (isDeleted){
//            return ResponseEntity
//                    .status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
//        }else {
//            return ResponseEntity
//                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
//        }
//    }
}
