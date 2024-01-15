package com.poly.springboot.repository;

import com.poly.springboot.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeRepository extends JpaRepository<Size,Long> {

    @Query("SELECT s FROM Size s WHERE s.deleted = true ORDER BY s.createdAt DESC")

    List<Size> findAllByDeletedTrue();

    Size findBySizeName(String sizeName);
    Boolean existsBySizeName(String SizeName);
    Page<Size> findBySizeNameContaining(String name, Pageable pageable);
    Page<Size> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Size> findBySizeNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);
}
