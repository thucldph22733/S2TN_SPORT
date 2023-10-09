package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.entity.Club;
import com.poly.springboot.entity.Color;
import com.poly.springboot.repository.ColorRepository;
import com.poly.springboot.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public List<Color> findAll() {
        return colorRepository.findAll();
    }

    @Override
    public List<Color> getPage(Integer pageNo) {
        return null;
    }

    @Override
    public String delete(Long id) {
        if (colorRepository.existsById(id)){
            colorRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public Color findById(Long id) {
        Optional<Color> result = colorRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Color sava(ColorRequestDto colorRequestDto) {
        Color color = new Color();
        color.setColorDescribe(colorRequestDto.getColorDescribe());
        color.setColorName(colorRequestDto.getColorName());
        colorRepository.save(color);
        return color;
    }

    @Override
    public Color update(ColorRequestDto colorRequestDto, Long id) {
        Color color = colorRepository.findById(id).get();
        color.setColorName(colorRequestDto.getColorName());
        color.setColorDescribe(colorRequestDto.getColorDescribe());
        colorRepository.save(color);
        return color;
    }
}
