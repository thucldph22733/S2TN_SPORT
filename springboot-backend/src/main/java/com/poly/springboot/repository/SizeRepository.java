package com.poly.springboot.repository;

import com.poly.springboot.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeRepository extends JpaRepository<Size,Long> {

    Boolean existsBySizeName(String sizeName);

    // Lọc những bản ghi chưa bị xóa mềm
}
