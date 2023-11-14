package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;
import com.poly.springboot.entity.Staff;


public class StaffMapper {


    //Phương thức chuyển đổi từ StaffRequestDto sang Staff
    public static Staff mapToStaffRequest(Staff staff , StaffRequestDto staffRequestDto){

        staff.setStaffName(staffRequestDto.getStaffName());
        staff.setAvatar(staffRequestDto.getAvatar());
        staff.setPhoneNumber(staffRequestDto.getPhoneNumber());
        staff.setEmail(staffRequestDto.getEmail());
        staff.setBirthOfDay(staffRequestDto.getBirthOfDay());
        staff.setAddress(staffRequestDto.getAddress());
        staff.setStatus(staffRequestDto.getStatus());
        staff.setRole(staffRequestDto.getRole());

        return staff;
    }
    //Phương thức chuyển đổi từ Staff sang StaffResponseDto
    public static StaffResponseDto mapToStaffResponse(Staff staff){

        StaffResponseDto staffResponseDto = StaffResponseDto.builder()
                .id(staff.getId())
                .role(staff.getRole())
                .staffName(staff.getStaffName())
                .avatar(staff.getAvatar())
                .phoneNumber(staff.getPhoneNumber())
                .email(staff.getEmail())
                .gender(staff.getGender())
                .birthOfDay(staff.getBirthOfDay())
                .address(staff.getAddress())
                .status(staff.getStatus())
                .createDate(staff.getCreateDate())
                .build();

        return staffResponseDto;
    }
}
