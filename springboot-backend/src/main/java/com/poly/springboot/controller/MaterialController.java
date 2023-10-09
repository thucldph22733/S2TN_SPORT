package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.dto.requestDto.MaterialRequestDto;
import com.poly.springboot.entity.Color;
import com.poly.springboot.entity.Material;
import com.poly.springboot.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class MaterialController {
    @Autowired
    private MaterialService material;

    @GetMapping("material")
    public ResponseEntity<List<Material>> getAll() {
        List<Material> a = material.findAll();
        return ResponseEntity.ok(a);

    }

    @GetMapping("material/{id}")
    public ResponseEntity<Material> findById(@PathVariable Long id){
        Material a = material.findById(id);
        return ResponseEntity.ok(a);
    }

    @PostMapping("create-material")
    public ResponseEntity<Material>crate(@RequestBody MaterialRequestDto materialRequestDto){
        Material a = material.save(materialRequestDto);
        return ResponseEntity.ok(a);
    }

    @PutMapping("update-material/{id}")
    public ResponseEntity<Material> update(@RequestBody MaterialRequestDto materialRequestDto,@PathVariable Long id){
        Material a = material.update(materialRequestDto,id);
        return ResponseEntity.ok(a);
    }

    @DeleteMapping("delete-material/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = material.delete(id);
        return ResponseEntity.ok(mes);
    }

}
