package com.poly.springboot.repository;

import com.poly.springboot.entity.Delivery;
import com.poly.springboot.entity.Delivery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery,Long> {

    Boolean existsByDeliveryName(String DeliveryName);
    Page<Delivery> findByDeliveryNameContaining(String name, Pageable pageable);
    Page<Delivery> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Delivery> findByDeliveryNameContainingAndDeletedIn(String name, List<Boolean> status, Pageable pageable);
}
