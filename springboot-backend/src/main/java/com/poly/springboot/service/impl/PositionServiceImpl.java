package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.PositionRequestDto;
import com.poly.springboot.dto.responseDto.PositionResponseDto;
import com.poly.springboot.entity.Position;
import com.poly.springboot.repository.PositionRepository;
import com.poly.springboot.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PositionServiceImpl implements PositionService {
    @Autowired
    private PositionRepository positionRepository;

    @Override
    public List<PositionResponseDto> getPositions() {
        return positionRepository.findAll().stream().map(
                position -> new PositionResponseDto(
                        position.getId(),
                        position.getPositionName(),
                        position.getPositionDescribe())
        ).collect(Collectors.toList());
    }

    @Override
    public Position savePosition(PositionRequestDto requestDto) {
        System.out.println(requestDto);
        Position position = new Position();

        position.setPositionName(requestDto.getPositionName());
        position.setPositionDescribe(requestDto.getPositionDescribe());
        System.out.println(position);


        return positionRepository.save(position);
    }

    @Override
    public Position updatePosition(PositionRequestDto requestDto, Long id) {
        Position position = positionRepository.findById(id).get();
        System.out.println(position);
        position.setPositionName(requestDto.getPositionName());
        position.setPositionDescribe(requestDto.getPositionDescribe());

        positionRepository.save(position);

        return position;
    }

    @Override
    public String delete(Long id) {
        if (positionRepository.existsById(id)) {
            positionRepository.deleteById(id);
            return "Xóa thành công";
        } else {
            return "Không tìm thấy id: "+id;
        }
    }

    @Override
    public Position findPositionById(Long id) {

        Optional<Position> result = positionRepository.findById(id);

        return result.isPresent() ? result.get() : null;

    }
}
