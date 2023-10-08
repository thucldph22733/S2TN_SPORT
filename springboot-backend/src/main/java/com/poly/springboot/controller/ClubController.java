package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.entity.Club;
import com.poly.springboot.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ClubController {

    @Autowired
    private ClubService club;

    @GetMapping("club")
    public ResponseEntity<List<Club>> getAll() {
        List<Club> a = club.findAll();
        return ResponseEntity.ok(a);

    }

    @GetMapping("club/{id}")
    public ResponseEntity<Club> findById(@PathVariable Long id){
        Club a = club.findById(id);
        return ResponseEntity.ok(a);
    }

    @PostMapping("create-club")
    public ResponseEntity<Club>crate(@RequestBody ClubRequestDto clubRequestDto){
        Club a = club.save(clubRequestDto);
        return ResponseEntity.ok(a);
    }

    @PutMapping("update-club/{id}")
    public ResponseEntity<Club> update(@RequestBody ClubRequestDto clubRequestDto,@PathVariable Long id){
        Club a = club.update(clubRequestDto,id);
        return ResponseEntity.ok(a);
    }

    @DeleteMapping("delete-club/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = club.delete(id);
        return ResponseEntity.ok(mes);
    }
}
