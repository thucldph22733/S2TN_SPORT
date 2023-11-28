package com.poly.springboot.repository;

import com.poly.springboot.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findByRoleName(String name);

    List<Role> findAllByDeletedTrue();
    List<Role> findAllByRoleNameIn(List<String> names);
}
