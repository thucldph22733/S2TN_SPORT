package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ShiftRequestDto;
import com.poly.springboot.dto.responseDto.ShiftResponseDto;
import com.poly.springboot.entity.Shifts;

import java.util.List;

public interface ShiftService {
    List<ShiftResponseDto> getShifts();

    Shifts getShift(Long id);

    Shifts createShift(ShiftRequestDto requestDto);

    Shifts updateShift(ShiftRequestDto requestDto, Long id);

    String deleteShift(Long id);
}
