package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.RoleRequestDto;
import com.poly.springboot.entity.Role;
import com.poly.springboot.repository.RoleRepository;
import com.poly.springboot.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Boolean createRole(RoleRequestDto roleRequestDto) {
        Role role = new Role();
        role.setRoleName(roleRequestDto.getRoleName());
        role.setRoleDescribe(role.getRoleDescribe());
        roleRepository.save(role);
        return true;
    }

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }
}
