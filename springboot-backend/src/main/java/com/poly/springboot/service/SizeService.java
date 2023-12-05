package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SizeService {
    Page<Size> getSizes(String name, List<Boolean> status, Pageable pageable);
    Boolean deleteSize(Long id);

    Boolean createSize(SizeRequestDto sizeRequestDto);

    Boolean updateSize(SizeRequestDto sizeRequestDto,Long id);

    List<Size> findAllByDeletedTrue();
}
