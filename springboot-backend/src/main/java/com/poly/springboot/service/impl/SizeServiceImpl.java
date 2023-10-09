package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.entity.Material;
import com.poly.springboot.entity.Size;
import com.poly.springboot.repository.SizeRepository;
import com.poly.springboot.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<Size> findAll() {
        return sizeRepository.findAll();
    }

    @Override
    public List<Size> getPage(Integer pageNo) {
        return null;
    }

    @Override
    public String delete(Long id) {
        if (sizeRepository.existsById(id)){
            sizeRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public Size findById(Long id) {
        Optional<Size> result = sizeRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Size save(SizeRequestDto sizeRequestDto) {
        Size size = new Size();
        size.setSizeName(sizeRequestDto.getSizeName());
        size.setSizeDescribe(sizeRequestDto.getSizeDescribe());
        sizeRepository.save(size);
        return size;

    }

    @Override
    public Size update(SizeRequestDto sizeRequestDto, Long id) {
        Size size = sizeRepository.findById(id).get();
        size.setSizeName(sizeRequestDto.getSizeName());
        size.setSizeDescribe(size.getSizeDescribe());
        sizeRepository.save(size);
        return size;
    }
}
