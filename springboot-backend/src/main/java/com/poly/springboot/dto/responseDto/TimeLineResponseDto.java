package com.poly.springboot.dto.responseDto;

import com.poly.springboot.entity.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TimeLineResponseDto {

    private Long id;

    private String note;

    private LocalDateTime createDate;

    private Integer status;

    private Long orderId;

    private Double orderTotal;

    private String staffName;

    private String paymentName;
}
