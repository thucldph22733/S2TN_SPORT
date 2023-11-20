package com.poly.springboot.repository;

import com.poly.springboot.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery,Long> {

    Boolean existsByDeliveryName(String deliveryName);

    // Lọc những bản ghi chưa bị xóa mềm
}
