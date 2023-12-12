package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.TimeLineResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.TimeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;

@Repository
public interface TimeLineRepository extends JpaRepository<TimeLine, Long> {
    @Query("SELECT o FROM TimeLine o WHERE o.order.id = :orderId AND o.deleted = true")
    List<TimeLine> findAllByStatusId(@Param("orderId") Long orderId);

    TimeLine findByOrderAndStatusAndDeletedTrue(Order order, Integer status);

    @Query("SELECT t FROM TimeLine t join Order o on t.order.id = o.id WHERE t.order.id = :orderId AND t.status = 5 AND t.deleted = true")
    List<TimeLine> findByOrderIdAndStatus(@Param("orderId") Long orderId);


}
