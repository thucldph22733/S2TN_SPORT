package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.entity.Size;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.SizeRepository;
import com.poly.springboot.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<Size> getSizes() {
        return sizeRepository.findAll();
    }

    @Override
    public Boolean deleteSize(Long id) {

        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("kích thước", String.valueOf(id)));
        sizeRepository.deleteById(size.getId());
        return true;
    }

    @Override
    public Boolean createSize(SizeRequestDto sizeRequestDto) {
        Size size = new Size();

        size.setSizeName(sizeRequestDto.getSizeName());
        size.setSizeDescribe(sizeRequestDto.getSizeDescribe());

        sizeRepository.save(size);

        return true;
    }

    @Override
    public Boolean updateSize(SizeRequestDto sizeRequestDto, Long id) {

        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("kích thước", String.valueOf(id)));

        size.setSizeName(sizeRequestDto.getSizeName());
        size.setSizeDescribe(sizeRequestDto.getSizeDescribe());

        sizeRepository.save(size);

        return true;
    }
}
