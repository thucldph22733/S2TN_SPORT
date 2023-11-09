//package com.poly.springboot.mapper;
//
//import com.poly.springboot.dto.requestDto.StaffRequestDto;
//import com.poly.springboot.dto.responseDto.StaffResponseDto;
//import com.poly.springboot.entity.Staff;
//
//public class StaffMapper {
//
//
//    public static Staff mapToStaffRequest(Staff staff, StaffRequestDto staffRequestDto){
//
//        staff.setStaffName(staffRequestDto.getStaffName());
//        staff.setAvatar(staffRequestDto.getAvatar());
//        staff.setPhoneNumber(staffRequestDto.getPhoneNumber());
//        staff.setEmail(staffRequestDto.getEmail());
//        staff.setGender(staffRequestDto.getGender());
//        staff.setBirthOfDay(staffRequestDto.getBirthOfDay());
//        staff.setAddress(staffRequestDto.getAddress());
//        staff.setCity(staffRequestDto.getCity());
//        staff.setCountry(staffRequestDto.getCountry());
//        staff.setPassword(staffRequestDto.getPassword());
//        staff.setStatus(staffRequestDto.getStatus());
//        return staff;
//    }
//    public static StaffResponseDto mapToStaffResponse(Staff staff, StaffResponseDto staffResponseDto){
//
//
//        staffResponseDto.setId(staff.getId());
//        staffResponseDto.setRoleName(staff.getRole() == null?"": staff.getRole().getRoleName());
//        staffResponseDto.setStaffName(staff.getStaffName());
//        staffResponseDto.setAvatar(staff.getAvatar());
//        staffResponseDto.setPhoneNumber(staff.getPhoneNumber());
//        staffResponseDto.setEmail(staff.getEmail());
//        staffResponseDto.setGender(staff.getGender());
//        staffResponseDto.setBirthOfDay(staff.getBirthOfDay());
//        staffResponseDto.setAddress(staff.getAddress());
//        staffResponseDto.setCity(staff.getCity());
//        staffResponseDto.setCountry(staff.getCountry());
//        staffResponseDto.setStatus(staff.getStatus());
//        return staffResponseDto;
//    }
//}
