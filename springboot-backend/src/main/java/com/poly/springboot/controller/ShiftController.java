package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ShiftRequestDto;
import com.poly.springboot.dto.responseDto.ShiftResponseDto;
import com.poly.springboot.entity.Shifts;
import com.poly.springboot.service.ShiftService;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/Shifts/")
@Tag(name = "Shifts")
public class ShiftController {

    @Autowired
    private ShiftService shiftService;

    @GetMapping("getAll")
    public ResponseEntity<List<ShiftResponseDto>> getShifts(){
        List<ShiftResponseDto> responseDtoList = shiftService.getShifts();
        return ResponseEntity.ok(responseDtoList);
    }



    @PostMapping("create")
    public ResponseEntity<Shifts> createShift(@RequestBody ShiftRequestDto requestDto){
        Shifts shifts = shiftService.createShift(requestDto);
        return ResponseEntity.ok(shifts);
    }

    @PutMapping("update")
    public ResponseEntity<Shifts> updateShift(@RequestBody ShiftRequestDto requestDto,@RequestParam Long id){
        Shifts shifts = shiftService.updateShift(requestDto,id);
        return ResponseEntity.ok(shifts);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteShift(@RequestParam Long id){
        String message = shiftService.deleteShift(id);
        return ResponseEntity.ok(message);
    }
}
