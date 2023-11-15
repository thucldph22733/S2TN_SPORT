package com.poly.springboot.dto.requestDto;

import com.poly.springboot.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailRequestDto {

    private Long productDetailId;

    private Long orderId;

    private Integer quantity;

    private Double price;

    private Boolean status;

    private String note;
}
