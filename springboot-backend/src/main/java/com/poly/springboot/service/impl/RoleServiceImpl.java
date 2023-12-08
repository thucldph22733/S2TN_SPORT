//package com.poly.springboot.service.impl;
//
//import com.poly.springboot.dto.requestDto.RoleRequestDto;
//import com.poly.springboot.entity.Role;
//import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.repository.RoleRepository;
//import com.poly.springboot.service.RoleService;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//@Service
//public class RoleServiceImpl implements RoleService {
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Override
//    public Boolean createRole(RoleRequestDto roleRequestDto) {
//        Role role = new Role();
//        role.setRoleName(roleRequestDto.getRoleName());
//        role.setRoleDescribe(roleRequestDto.getRoleDescribe());
//        role.setDeleted(roleRequestDto.getDeleted());
//        roleRepository.save(role);
//        return true;
//    }
//
//    @Override
//    public Boolean updateRole(RoleRequestDto roleRequestDto,Long id) {
//        Role role = roleRepository.findById(id)
//                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id vai trò này!"));
//
//        role.setRoleName(roleRequestDto.getRoleName());
//        role.setRoleDescribe(roleRequestDto.getRoleDescribe());
//        role.setDeleted(roleRequestDto.getDeleted());
//        roleRepository.save(role);
//
//        return true;
//    }
//
//    @Override
//    @Transactional
//    public Boolean deleteRole(Long id) {
//        Role role = roleRepository.findById(id)
//                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id vai trò này!"));
//
//        role.setDeleted(!role.getDeleted());
//        roleRepository.save(role);
//        return true;
//    }
//
//    @Override
//    public Page<Role> getRoles(String name, List<Boolean> status, Pageable pageable) {
//        Page<Role> rolePage;
//
//        if (name == null && status == null) {
//            rolePage = roleRepository.findAll(pageable);
//        } else if (name == null) {
//            rolePage = roleRepository.findByDeletedIn(status, pageable);
//        } else if (status == null) {
//            rolePage = roleRepository.findByRoleNameContaining(name, pageable);
//        } else {
//            rolePage = roleRepository.findByRoleNameContainingAndDeletedIn(name, status, pageable);
//        }
//        return rolePage;
//    }
//
//    @Override
//    public List<Role> findAllByDeletedTrue() {
//        return roleRepository.findAllByDeletedTrue();
//    }
//}
