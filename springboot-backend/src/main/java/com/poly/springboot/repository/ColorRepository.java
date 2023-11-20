package com.poly.springboot.repository;

import com.poly.springboot.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color,Long> {

    Boolean existsByColorName(String colorName);

    // Lọc những bản ghi chưa bị xóa mềm

}
