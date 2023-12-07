package com.poly.springboot.repository;

import com.poly.springboot.entity.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material,Long> {

    Boolean existsByMaterialName(String MaterialName);
    Page<Material> findByMaterialNameContaining(String name, Pageable pageable);
    Page<Material> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Material> findByMaterialNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);
}
