package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;
import com.poly.springboot.entity.Staff;


import java.util.List;


public interface StaffService {

    List<StaffResponseDto> getStaff();

    Staff saveStaff(StaffRequestDto requestDto);

    Staff updateStaff(StaffRequestDto requestDto,Long id);

    String delete(Long id);

    Staff findStaffById(Long id);

}
