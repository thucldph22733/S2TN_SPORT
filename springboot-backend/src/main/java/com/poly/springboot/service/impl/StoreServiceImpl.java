package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.StoreRequestDto;
import com.poly.springboot.dto.responseDto.StoreResponseDto;
import com.poly.springboot.entity.Store;
import com.poly.springboot.repository.StoreRepository;
import com.poly.springboot.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public List<StoreResponseDto> getStores() {
        return storeRepository.findAll().stream().map(
                store -> new StoreResponseDto(
                        store.getId(),
                        store.getStoreName(),
                        store.getNumberPhone(),
                        store.getEmail(),
                        store.getStreet(),
                        store.getCity(),
                        store.getCountry(),
                        store.getStartTime(),
                        store.getEndTime(),
                        store.getStoreDescribe())
        ).collect(Collectors.toList());
    }

    @Override
    public Store saveStore(StoreRequestDto requestDto) {
        Store store = new Store();

        store.setStoreName(requestDto.getStoreName());
        store.setNumberPhone(requestDto.getNumberPhone());
        store.setEmail(requestDto.getEmail());
        store.setStreet(requestDto.getStreet());
        store.setCity(requestDto.getCity());
        store.setCountry(requestDto.getCountry());
        store.setStartTime(requestDto.getStartTime());
        store.setEndTime(requestDto.getEndTime());
        store.setStoreDescribe(requestDto.getStoreDescribe());

        storeRepository.save(store);
        return store;
    }

    @Override
    public Store updateStore(StoreRequestDto requestDto, Long id) {
        Store store = storeRepository.findById(id).get();

        store.setStoreName(requestDto.getStoreName());
        store.setNumberPhone(requestDto.getNumberPhone());
        store.setEmail(requestDto.getEmail());
        store.setStreet(requestDto.getStreet());
        store.setCity(requestDto.getCity());
        store.setCountry(requestDto.getCountry());
        store.setStartTime(requestDto.getStartTime());
        store.setEndTime(requestDto.getEndTime());
        store.setStoreDescribe(requestDto.getStoreDescribe());

        storeRepository.save(store);
        return store;
    }

    @Override
    public String delete(Long id) {
        if(storeRepository.existsById(id)){

            storeRepository.deleteById(id);

            return "Xóa Thành Công";
        }else {

            return "Không tìm thấy id: "+id;
        }

    }

    @Override
    public Store findStoreById(Long id) {

        Optional<Store> result = storeRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }
}
