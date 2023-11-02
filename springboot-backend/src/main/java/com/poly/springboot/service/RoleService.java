package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.RoleRequestDto;
import com.poly.springboot.entity.Role;
import java.util.List;

public interface RoleService {
    List<Role> getRoles();

    Boolean createRole(RoleRequestDto requestDto);

    Boolean updateRole(RoleRequestDto requestDto, Long id);

    Boolean deleteRole(Long id);


}
