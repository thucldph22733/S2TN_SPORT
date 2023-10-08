package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.dto.requestDto.ColorRequestDto;
import com.poly.springboot.entity.Club;
import com.poly.springboot.entity.Color;
import com.poly.springboot.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ColorController {
    @Autowired
    private ColorService color;


    @GetMapping("color")
    public ResponseEntity<List<Color>> getAll() {
        List<Color> a = color.findAll();
        return ResponseEntity.ok(a);

    }

    @GetMapping("color/{id}")
    public ResponseEntity<Color> findById(@PathVariable Long id){
        Color a = color.findById(id);
        return ResponseEntity.ok(a);
    }

    @PostMapping("create-color")
    public ResponseEntity<Color>crate(@RequestBody ColorRequestDto colorRequestDto){
        Color a = color.sava(colorRequestDto);
        return ResponseEntity.ok(a);
    }

    @PutMapping("update-color/{id}")
    public ResponseEntity<Color> update(@RequestBody ColorRequestDto colorRequestDto,@PathVariable Long id){
        Color a = color.update(colorRequestDto,id);
        return ResponseEntity.ok(a);
    }

    @DeleteMapping("delete-color/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = color.delete(id);
        return ResponseEntity.ok(mes);
    }

}
