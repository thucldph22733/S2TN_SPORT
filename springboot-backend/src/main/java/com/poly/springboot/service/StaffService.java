package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.AuthenticationRequestDto;
import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.AuthenticationResponseDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import java.io.IOException;
import java.util.List;


public interface StaffService {

    List<UserResponseDto> getStaffs();

    List<UserResponseDto> getPagination(Integer pageNo);

    List<UserResponseDto> searchStaff(String keyword, Integer pageNo);

    Boolean createStaff(StaffRequestDto requestDto);

    Boolean updateStaff(StaffRequestDto requestDto,Long id);

    Boolean deleteStaff(Long id);

    AuthenticationResponseDto loginStaff(AuthenticationRequestDto request);

    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
