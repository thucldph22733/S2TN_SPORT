package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ShiftRequestDto;
import com.poly.springboot.dto.responseDto.ShiftResponseDto;
import com.poly.springboot.entity.Shifts;
import com.poly.springboot.service.ShiftService;
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
@RequestMapping("/api/v1/")
public class ShiftController {

    @Autowired
    private ShiftService shiftService;

    @GetMapping("shifts")
    public ResponseEntity<List<ShiftResponseDto>> getShifts(){
        List<ShiftResponseDto> responseDtoList = shiftService.getShifts();
        return ResponseEntity.ok(responseDtoList);
    }

    @GetMapping("shift/{id}")
    public ResponseEntity<Shifts> getShift(@PathVariable Long id){
        Shifts shifts = shiftService.getShift(id);
        return ResponseEntity.ok(shifts);
    }

    @PostMapping("create-shift")
    public ResponseEntity<Shifts> createShift(@RequestBody ShiftRequestDto requestDto){
        Shifts shifts = shiftService.createShift(requestDto);
        return ResponseEntity.ok(shifts);
    }

    @PutMapping("update-shift/{id}")
    public ResponseEntity<Shifts> updateShift(@RequestBody ShiftRequestDto requestDto,@PathVariable Long id){
        Shifts shifts = shiftService.updateShift(requestDto,id);
        return ResponseEntity.ok(shifts);
    }

    @DeleteMapping("delete-shift/{id}")
    public ResponseEntity<String> deleteShift(@PathVariable Long id){
        String message = shiftService.deleteShift(id);
        return ResponseEntity.ok(message);
    }
}
