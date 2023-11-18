package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import com.poly.springboot.entity.User;


public class UserMapper {


    //Phương thức chuyển đổi từ StaffRequestDto sang Staff
    public static User mapToStaffRequest(User staff , StaffRequestDto staffRequestDto){

        staff.setUserName(staffRequestDto.getStaffName());
        staff.setPhoneNumber(staffRequestDto.getPhoneNumber());
        staff.setEmail(staffRequestDto.getEmail());
        staff.setBirthOfDay(staffRequestDto.getBirthOfDay());
        staff.setDeleted(staffRequestDto.getStatus());
        staff.setRole(staffRequestDto.getRole());

        return staff;
    }
    //Phương thức chuyển đổi từ Staff sang StaffResponseDto
    public static UserResponseDto mapToStaffResponse(User staff){

        UserResponseDto staffResponseDto = UserResponseDto.builder()
                .id(staff.getId())
                .role(staff.getRole())
                .u(staff.getStaffName())
                .avatar(staff.getAvatar())
                .phoneNumber(staff.getPhoneNumber())
                .email(staff.getEmail())
                .gender(staff.getGender())
                .birthOfDay(staff.getBirthOfDay())
                .address(staff.getAddress())
                .status(staff.isDeleted())
                .build();

        return staffResponseDto;
    }
}
