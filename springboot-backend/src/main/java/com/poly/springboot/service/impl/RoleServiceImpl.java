package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.RoleRequestDto;
import com.poly.springboot.entity.Role;
import com.poly.springboot.repository.RoleRepository;
import com.poly.springboot.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role saveRole(RoleRequestDto requestDto) {
        System.out.println(requestDto);
        Role role = new Role();

        role.setRoleName(requestDto.getRoleName());
        role.setRoleDescribe(requestDto.getRoleDescribe());
        System.out.println(role);


        return roleRepository.save(role);
    }

    @Override
    public Role updateRole(RoleRequestDto requestDto, Long id) {
        Role role = roleRepository.findById(id).get();
        System.out.println(role);
        role.setRoleName(requestDto.getRoleName());
        role.setRoleDescribe(requestDto.getRoleDescribe());

        roleRepository.save(role);

        return role;
    }

    @Override
    public String deleteRole(Long id) {
        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
            return "Xóa thành công";
        } else {
            return "Không tìm thấy id: "+id;
        }
    }

    @Override
    public Role findRoleById(Long id) {

        Optional<Role> result = roleRepository.findById(id);

        return result.isPresent() ? result.get() : null;

    }
}
