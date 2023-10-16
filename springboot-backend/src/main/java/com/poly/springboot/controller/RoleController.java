package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.RoleRequestDto;
import com.poly.springboot.entity.Role;
import com.poly.springboot.service.RoleService;
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
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("create-role")
    public ResponseEntity<Role> createRole(@RequestBody RoleRequestDto roleRequestDto){
        Role position = roleService.saveRole(roleRequestDto);
        return ResponseEntity.ok(position);
    }

    @GetMapping("roles")
    public ResponseEntity<List<Role>> getRoles(){
        List<Role> roleList = roleService.getRoles();
        return ResponseEntity.ok(roleList);
    }

    @GetMapping("role/{id}")
    public ResponseEntity<Role> getRole(@PathVariable Long id){
        Role role = roleService.findRoleById(id);
        return ResponseEntity.ok(role);
    }

    @PutMapping("update-role/{id}")
    public ResponseEntity<Role> updateRole(@RequestBody RoleRequestDto roleRequestDto, @PathVariable Long id){
        Role role = roleService.updateRole(roleRequestDto,id);
        return ResponseEntity.ok(role);
    }

    @DeleteMapping("delete-role/{id}")
    public ResponseEntity<String> deleteRole(@PathVariable Long id){
        String message = roleService.deleteRole(id);
        return ResponseEntity.ok(message);
    }

}
