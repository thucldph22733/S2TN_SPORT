package com.poly.springboot.repository;

import com.poly.springboot.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material,Long> {

    Boolean existsByMaterialName(String materialName);

    // Lọc những bản ghi chưa bị xóa mềm
}
