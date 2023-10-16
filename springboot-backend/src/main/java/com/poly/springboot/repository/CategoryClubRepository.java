package com.poly.springboot.repository;

import com.poly.springboot.entity.CategoryClub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryClubRepository extends JpaRepository<CategoryClub,Long> {
}
