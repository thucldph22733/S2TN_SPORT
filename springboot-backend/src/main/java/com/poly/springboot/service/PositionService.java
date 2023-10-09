package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.PositionRequestDto;
import com.poly.springboot.dto.responseDto.PositionResponseDto;
import com.poly.springboot.entity.Position;
import java.util.List;

public interface PositionService {
    List<PositionResponseDto> getPositions();

    Position savePosition(PositionRequestDto requestDto);

    Position updatePosition(PositionRequestDto requestDto,Long id);

    String delete(Long id);

    Position findPositionById(Long id);

}
