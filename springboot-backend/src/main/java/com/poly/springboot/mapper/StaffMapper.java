package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;
import com.poly.springboot.entity.Staff;
import org.springframework.security.crypto.password.PasswordEncoder;


public class StaffMapper {

    private  static  PasswordEncoder passwordEncoder;


    public static Staff mapToStaffRequest(Staff staff , StaffRequestDto staffRequestDto){

           Staff.builder()
                .staffName(staffRequestDto.getStaffName())
                .avatar(staffRequestDto.getAvatar())
                .phoneNumber(staffRequestDto.getPhoneNumber())
                .email(staffRequestDto.getEmail())
                .gender(staffRequestDto.getGender())
                .birthOfDay(staffRequestDto.getBirthOfDay())
                .address(staffRequestDto.getAddress())
                .password(passwordEncoder.encode(staffRequestDto.getPassword()))
                .status(staffRequestDto.getStatus())
                .build();
         return staff;
    }
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
