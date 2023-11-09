//package com.poly.springboot.service.impl;
//
//import com.poly.springboot.dto.requestDto.RoleRequestDto;
//import com.poly.springboot.entity.Role;
//import com.poly.springboot.exception.AlreadyExistsException;
//import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.repository.RoleRepository;
//import com.poly.springboot.service.RoleService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class RoleServiceImpl implements RoleService {
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Override
//    public List<Role> getRoles() {
//        return roleRepository.findAll();
//    }
//
//    @Override
//    public Boolean createRole(RoleRequestDto requestDto) {
//        Role role = new Role();
//
//        role.setRoleName(requestDto.getRoleName());
//        role.setRoleDescribe(requestDto.getRoleDescribe());
//
//        if (roleRepository.existsByRoleName(requestDto.getRoleName())){
//            throw new AlreadyExistsException("Tên vai trò đã tồn tại!");
//        }
//        roleRepository.save(role);
//        return true;
//    }
//
//    @Override
//    public Boolean updateRole(RoleRequestDto requestDto, Long id) {
//        Role role = roleRepository.findById(id)
//                .orElseThrow(()->new ResourceNotFoundException("vai trò",String.valueOf(id)));
//
//        role.setRoleName(requestDto.getRoleName());
//        role.setRoleDescribe(requestDto.getRoleDescribe());
//
//        roleRepository.save(role);
//
//        return true;
//    }
//
//    @Override
//    public Boolean deleteRole(Long id) {
//
//        Role role = roleRepository.findById(id)
//                .orElseThrow(()->new ResourceNotFoundException("vai trò",String.valueOf(id)));
//
//        roleRepository.deleteById(role.getId());
//
//        return true;
//    }
//
//
//}
