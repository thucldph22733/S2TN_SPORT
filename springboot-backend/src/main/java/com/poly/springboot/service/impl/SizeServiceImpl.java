package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.entity.Size;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.SizeRepository;
import com.poly.springboot.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public Page<Size> getSizes(String name, List<Boolean> status, Pageable pageable) {

        Page<Size> SizeList;

        if (name == null && status == null) {
            SizeList = sizeRepository.findAll(pageable);
        } else if (name == null) {
            SizeList = sizeRepository.findByDeletedIn(status, pageable);
        } else if (status == null) {
            SizeList = sizeRepository.findBySizeNameContaining(name, pageable);
        } else {
            SizeList = sizeRepository.findBySizeNameContainingAndDeletedIn(name, status, pageable);
        }
        return SizeList;
    }

    @Override
    public Boolean deleteSize(Long id) {

        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id kích thước này!"));

        size.setDeleted(!size.getDeleted());

        sizeRepository.save(size);

        return true;
    }

    @Override
    public Boolean createSize(SizeRequestDto sizeRequestDto) {
        Size size = new Size();

        size.setSizeName(sizeRequestDto.getSizeName());
        size.setSizeDescribe(sizeRequestDto.getSizeDescribe());
        size.setDeleted(sizeRequestDto.getDeleted());

        if (sizeRepository.existsBySizeName(sizeRequestDto.getSizeName())) {
            throw new AlreadyExistsException("Tên kích thức đã tồn tại!");
        }
        sizeRepository.save(size);

        return true;
    }

    @Override
    public Boolean updateSize(SizeRequestDto sizeRequestDto, Long id) {

        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id kích thước này!"));

        size.setSizeName(sizeRequestDto.getSizeName());
        size.setSizeDescribe(sizeRequestDto.getSizeDescribe());
        size.setDeleted(sizeRequestDto.getDeleted());
        sizeRepository.save(size);

        return true;
    }

    @Override
    public List<Size> findAllByDeletedTrue() {
        return sizeRepository.findAllByDeletedTrue();
    }
}
