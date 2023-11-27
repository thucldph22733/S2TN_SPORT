package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.RoleRequestDto;
import com.poly.springboot.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface RoleService {

    Boolean createRole(RoleRequestDto roleRequestDto);

    Boolean updateRole(RoleRequestDto roleRequestDto,Long id);

    Boolean deleteRole(Long id);

    Page<Role> getRoles(Pageable pageable);
}
