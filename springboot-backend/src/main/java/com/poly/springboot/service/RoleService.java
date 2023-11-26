package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.RoleRequestDto;
import com.poly.springboot.entity.Role;

import java.util.List;

public interface RoleService {

    Boolean createRole(RoleRequestDto roleRequestDto);

    List<Role> getRoles();
}
