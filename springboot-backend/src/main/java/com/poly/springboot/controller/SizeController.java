package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.SizeRequestDto;
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
    private SizeService sizeService;

    @GetMapping("sizes")
    public ResponseEntity<List<Size>> getAll() {
        List<Size> a = sizeService.findAll();
        return ResponseEntity.ok(a);

    }

    @GetMapping("size/{id}")
    public ResponseEntity<Size> findById(@PathVariable Long id){
        Size size = sizeService.findById(id);
        return ResponseEntity.ok(size);
    }

    @PostMapping("create-size")
    public ResponseEntity<Size>crate(@RequestBody SizeRequestDto sizeRequestDto){
        Size size = sizeService.save(sizeRequestDto);
        return ResponseEntity.ok(size);
    }

    @PutMapping("update-size/{id}")
    public ResponseEntity<Size> update(@RequestBody SizeRequestDto sizeRequestDto,@PathVariable Long id){
        Size size = sizeService.update(sizeRequestDto,id);
        return ResponseEntity.ok(size);
    }

    @DeleteMapping("delete-size/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = sizeService.delete(id);
        return ResponseEntity.ok(mes);
    }

}
