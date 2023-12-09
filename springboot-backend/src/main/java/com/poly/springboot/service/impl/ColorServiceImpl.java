package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.entity.Color;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.ColorRepository;
import com.poly.springboot.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public Page<Color> getColors(String name, List<Boolean> status, Pageable pageable) {

        Page<Color> ColorList;

        if (name == null && status == null){
            ColorList = colorRepository.findAll(pageable);
        }else if (name == null){
            ColorList = colorRepository.findByDeletedIn(status,pageable);
        }else if (status == null){
            ColorList = colorRepository.findByColorNameContaining(name,pageable);
        }else {
            ColorList = colorRepository.findByColorNameContainingAndDeletedIn(name,status,pageable);
        }
        return ColorList;
    }

    @Override
    public Boolean deleteColor(Long id) {
        Color color = colorRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy id màu sắc bộ này!"));

        color.setDeleted(!color.getDeleted());

        colorRepository.save(color);

        return true;
    }

    @Override
    public Boolean createColor(ColorRequestDto colorRequestDto) {

        Color color = new Color();

        color.setColorDescribe(colorRequestDto.getColorDescribe());
        color.setColorName(colorRequestDto.getColorName());
        color.setDeleted(colorRequestDto.getDeleted());
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
        color.setDeleted(colorRequestDto.getDeleted());

        colorRepository.save(color);
        return true;
    }

    @Override
    public List<Color> findAllByDeletedTrue() {
        return colorRepository.findAllByDeletedTrue();
    }
}
