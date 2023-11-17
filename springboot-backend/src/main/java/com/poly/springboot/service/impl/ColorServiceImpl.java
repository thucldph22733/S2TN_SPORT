package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.entity.Color;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.ColorRepository;
import com.poly.springboot.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public List<Color> getColors() {
        return colorRepository.findAll();
    }

    @Override
    public Boolean deleteColor(Long id) {
        Color color = colorRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy id màu sắc bộ này!"));
        colorRepository.deleteById(color.getId());
        return true;
    }

    @Override
    public Boolean createColor(ColorRequestDto colorRequestDto) {

        Color color = new Color();

        color.setColorDescribe(colorRequestDto.getColorDescribe());
        color.setColorName(colorRequestDto.getColorName());
        if (colorRepository.existsByColorName(colorRequestDto.getColorName())){
            throw  new AlreadyExistsException("Tên thương hiệu đã tồn tại!");
        }
        colorRepository.save(color);
        return true;
    }

    @Override
    public Boolean updateColor(ColorRequestDto colorRequestDto, Long id) {

        Color color = colorRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy id màu sắc bộ này!"));

        color.setColorDescribe(colorRequestDto.getColorDescribe());
        color.setColorName(colorRequestDto.getColorName());

        colorRepository.save(color);
        return true;
    }
}
