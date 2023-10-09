package com.poly.springboot.repository;

import com.poly.springboot.entity.Shifts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShiftRepository extends JpaRepository<Shifts, Long> {
}
