package com.poly.springboot.repository;

import com.poly.springboot.entity.CategoryVoucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryVoucherRepository extends JpaRepository<CategoryVoucher,Long> {
}
