package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.StoreRequestDto;
import com.poly.springboot.dto.responseDto.StoreResponseDto;
import com.poly.springboot.entity.Store;
import com.poly.springboot.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class StoreController {
    @Autowired
    private StoreService storeService;

    @GetMapping("stores")
    public ResponseEntity<List<StoreResponseDto>> getStores(){
        List<StoreResponseDto> storeResponseDtoList = storeService.getStores();
        return ResponseEntity.ok(storeResponseDtoList);
    }

    @GetMapping("store/{id}")
    public ResponseEntity<Store> getStore(@PathVariable Long id){
        Store store = storeService.findStoreById(id);
        return ResponseEntity.ok(store);
    }

    @PostMapping("create-store")
    public ResponseEntity<Store> createStore(@RequestBody StoreRequestDto storeRequestDto){
        Store store = storeService.saveStore(storeRequestDto);
        return ResponseEntity.ok(store);
    }

    @PutMapping("update-store/{id}")
    public ResponseEntity<Store> updateStore(@RequestBody StoreRequestDto storeRequestDto, @PathVariable Long id){
        Store store = storeService.updateStore(storeRequestDto,id);
        return ResponseEntity.ok(store);
    }

    @DeleteMapping("delete-Store/{id}")
    public ResponseEntity<String> deleteStore(@PathVariable Long id){
        String message = storeService.delete(id);
        return ResponseEntity.ok(message);
    }
}
