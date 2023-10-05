package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.StoreRequestDto;
import com.poly.springboot.dto.responseDto.StoreResponseDto;
import com.poly.springboot.entity.Store;

import java.util.List;

public interface StoreService {

    List<StoreResponseDto> getStores();

    Store saveStore(StoreRequestDto requestDto);

    Store updateStore(StoreRequestDto requestDto,Long id);

    String delete(Long id);

    Store findStoreById(Long id);
}
