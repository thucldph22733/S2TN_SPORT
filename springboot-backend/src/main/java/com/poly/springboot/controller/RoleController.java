package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.RoleRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Role;
import com.poly.springboot.service.RoleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/roles/")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("getAll")
    public ResponseEntity<List<Role>> getRoles(){

        List<Role> roleList = roleService.getRoles();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(roleList);
    }
    @PostMapping("create")
    public ResponseEntity<?> createRole(@RequestBody RoleRequestDto roleRequestDto){
        Boolean isCreated = roleService.createRole(roleRequestDto);
        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
}
