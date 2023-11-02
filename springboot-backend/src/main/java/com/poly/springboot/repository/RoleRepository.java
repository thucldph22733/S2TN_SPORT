package com.poly.springboot.repository;

import com.poly.springboot.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Boolean existsByRoleName(String roleName);
}
