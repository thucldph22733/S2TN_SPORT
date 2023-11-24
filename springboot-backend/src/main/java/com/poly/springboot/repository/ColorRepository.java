package com.poly.springboot.repository;

import com.poly.springboot.entity.Color;
import com.poly.springboot.entity.Color;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color,Long> {

    Boolean existsByColorName(String ColorName);
    Page<Color> findByColorNameContaining(String name, Pageable pageable);
    Page<Color> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Color> findByColorNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);

}
