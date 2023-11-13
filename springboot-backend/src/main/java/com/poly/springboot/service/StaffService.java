package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;


import java.util.List;


public interface StaffService {

//    List<StaffResponseDto> getStaffs();

    List<StaffResponseDto> getPagination(Integer pageNo);

    List<StaffResponseDto> searchStaff(String keyword,Integer pageNo);

//    Boolean createStaff(StaffRequestDto requestDto);

    Boolean updateStaff(StaffRequestDto requestDto,Long id);

    Boolean deleteStaff(Long id);


}
