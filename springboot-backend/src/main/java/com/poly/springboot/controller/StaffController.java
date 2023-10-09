package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;
import com.poly.springboot.entity.Staff;
import com.poly.springboot.service.StaffService;
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
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping("staffs")
    public ResponseEntity<List<StaffResponseDto>> getStaffs(){
        List<StaffResponseDto> staffResponseDtoList = staffService.getStaffs();
        return ResponseEntity.ok(staffResponseDtoList);
    }

    @GetMapping("staff/{id}")
    public ResponseEntity<Staff> getStaff(@PathVariable Long id){
        Staff staff = staffService.findStaffById(id);
        return ResponseEntity.ok(staff);
    }

    @PostMapping("create-staff")
    public ResponseEntity<Staff> createStaff(@RequestBody StaffRequestDto staffRequestDto){
        Staff staff = staffService.saveStaff(staffRequestDto);
        return ResponseEntity.ok(staff);
    }

    @PutMapping("update-staff/{id}")
    public ResponseEntity<Staff> updateStaff(@RequestBody StaffRequestDto staffRequestDto,@PathVariable Long id){
        Staff staff = staffService.updateStaff(staffRequestDto,id);
        return ResponseEntity.ok(staff);
    }

    @DeleteMapping("delete-staff/{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable Long id){
        String message = staffService.delete(id);
        return ResponseEntity.ok(message);
    }
}
