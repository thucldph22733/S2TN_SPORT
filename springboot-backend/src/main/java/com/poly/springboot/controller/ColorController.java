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
    private ColorService colorService;


    @GetMapping("colors")
    public ResponseEntity<List<Color>> getAll() {
        List<Color> a = colorService.findAll();
        return ResponseEntity.ok(a);

    }

    @GetMapping("color/{id}")
    public ResponseEntity<Color> findById(@PathVariable Long id){
        Color a = colorService.findById(id);
        return ResponseEntity.ok(a);
    }

    @PostMapping("create-color")
    public ResponseEntity<Color>crate(@RequestBody ColorRequestDto colorRequestDto){
        Color a = colorService.sava(colorRequestDto);
        return ResponseEntity.ok(a);
    }

    @PutMapping("update-color/{id}")
    public ResponseEntity<Color> update(@RequestBody ColorRequestDto colorRequestDto,@PathVariable Long id){
        Color a = colorService.update(colorRequestDto,id);
        return ResponseEntity.ok(a);
    }

    @DeleteMapping("delete-color/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = colorService.delete(id);
        return ResponseEntity.ok(mes);
    }

}
