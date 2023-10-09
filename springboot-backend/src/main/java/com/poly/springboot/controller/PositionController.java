package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.PositionRequestDto;
import com.poly.springboot.dto.responseDto.PositionResponseDto;
import com.poly.springboot.entity.Position;
import com.poly.springboot.service.PositionService;
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
public class PositionController {

    @Autowired
    private PositionService positionService;

    @PostMapping("create-position")
    public ResponseEntity<Position> createPosition(@RequestBody PositionRequestDto positionRequestDto){
        Position position = positionService.savePosition(positionRequestDto);
        return ResponseEntity.ok(position);
    }

    @GetMapping("positions")
    public ResponseEntity<List<PositionResponseDto>> getPositions(){
        List<PositionResponseDto> responseDtoList = positionService.getPositions();
        return ResponseEntity.ok(responseDtoList);
    }

    @GetMapping("position/{id}")
    public ResponseEntity<Position> getPosition(@PathVariable Long id){
        Position position = positionService.findPositionById(id);
        return ResponseEntity.ok(position);
    }

    @PutMapping("update-position/{id}")
    public ResponseEntity<Position> updatePosition(@RequestBody PositionRequestDto positionRequestDto,@PathVariable Long id){
        Position position = positionService.updatePosition(positionRequestDto,id);
        return ResponseEntity.ok(position);
    }

    @DeleteMapping("delete-position/{id}")
    public ResponseEntity<String> deletePosition(@PathVariable Long id){
        String message = positionService.delete(id);
        return ResponseEntity.ok(message);
    }

}
