//package com.poly.springboot.repository;
//
//import com.poly.springboot.entity.Role;
//import com.poly.springboot.entity.Size;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface RoleRepository extends JpaRepository<Role,Long> {
//
//    Optional<Role> findByRoleName(String name);
//
//    List<Role> findAllByDeletedTrue();
//    List<Role> findAllByRoleNameIn(List<String> names);
//
//    Page<Role> findByRoleNameContaining(String name, Pageable pageable);
//    Page<Role> findByDeletedIn(List<Boolean> status, Pageable pageable);
//    Page<Role> findByRoleNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);
//}
