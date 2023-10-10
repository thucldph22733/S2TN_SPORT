package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.PositionRequestDto;
import com.poly.springboot.entity.Position;
import java.util.List;

public interface PositionService {
    List<Position> getPositions();

    Position savePosition(PositionRequestDto requestDto);

    Position updatePosition(PositionRequestDto requestDto,Long id);

    String deletePosition(Long id);

    Position findPositionById(Long id);

}
