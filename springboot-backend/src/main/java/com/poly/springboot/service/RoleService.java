package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.RoleRequestDto;
import com.poly.springboot.entity.Role;
import java.util.List;

public interface RoleService {
    List<Role> getRoles();

    Role saveRole(RoleRequestDto requestDto);

    Role updateRole(RoleRequestDto requestDto, Long id);

    String deleteRole(Long id);

    Role findRoleById(Long id);

}
