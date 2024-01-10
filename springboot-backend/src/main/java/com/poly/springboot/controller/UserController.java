package com.poly.springboot.controller;


import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.ChangePasswordRequestDto;
import com.poly.springboot.dto.requestDto.UserFilterRequestDto;
import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import com.poly.springboot.entity.User;
import com.poly.springboot.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@Validated
@Tag(name = "Users",description = "( Rest API Hiển thị, thêm, sửa, xóa, tìm kiếm, phân trang nhân viên )")
@RequestMapping("/api/v1/users/")
//@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("getAllUserByFilter")
//    @PreAuthorize("hasAuthority('admin:read')")
    public ResponseEntity<?> getUsers(@RequestBody UserFilterRequestDto requestDto){


        Page<UserResponseDto>  userResponseDtoPage = userService.getUsersByFilter(requestDto);

        List<UserResponseDto> userResponseDtoList = userResponseDtoPage.getContent();

        return ResponseHandler.generateResponse(HttpStatus.OK,userResponseDtoList,userResponseDtoPage);
    }



    @PatchMapping("changePassword")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequestDto request,
            Principal connectedUser
    ) {
        Boolean isChangePassword = userService.changePassword(request, connectedUser);
        if (isChangePassword){
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }


    @PostMapping("create")
//    @PreAuthorize("hasAuthority('admin:create')")
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
//    @PreAuthorize("hasAuthority('admin:update')")
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

    @DeleteMapping("delete")
//    @PreAuthorize("hasAuthority('admin:delete')")
    public ResponseEntity<ResponseDto> deleteStaff(@RequestParam Long id){
        Boolean isDeleted = userService .deleteUser(id);
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

    @GetMapping("getUserById")
    public ResponseEntity<UserResponseDto> getUserById(@RequestParam Long id) {
        UserResponseDto userResponseDto = userService.getUserById(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userResponseDto);
    }

}
