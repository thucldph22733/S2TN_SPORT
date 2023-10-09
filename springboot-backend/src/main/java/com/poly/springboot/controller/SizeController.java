package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.dto.requestDto.SizeRequestDto;
import com.poly.springboot.entity.Material;
import com.poly.springboot.entity.Size;
import com.poly.springboot.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class SizeController {

    @Autowired
    private SizeService size;

    @GetMapping("size")
    public ResponseEntity<List<Size>> getAll() {
        List<Size> a = size.findAll();
        return ResponseEntity.ok(a);

    }

    @GetMapping("size/{id}")
    public ResponseEntity<Size> findById(@PathVariable Long id){
        Size a = size.findById(id);
        return ResponseEntity.ok(a);
    }

    @PostMapping("create-size")
    public ResponseEntity<Size>crate(@RequestBody SizeRequestDto sizeRequestDto){
        Size a = size.save(sizeRequestDto);
        return ResponseEntity.ok(a);
    }

    @PutMapping("update-size/{id}")
    public ResponseEntity<Size> update(@RequestBody SizeRequestDto sizeRequestDto,@PathVariable Long id){
        Size a = size.update(sizeRequestDto,id);
        return ResponseEntity.ok(a);
    }

    @DeleteMapping("delete-size/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = size.delete(id);
        return ResponseEntity.ok(mes);
    }

}
