package com.poly.springboot.repository;

import com.poly.springboot.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail,Long> {

}
