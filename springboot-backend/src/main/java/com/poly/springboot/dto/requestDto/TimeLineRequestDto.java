package com.poly.springboot.dto.requestDto;

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
public class TimeLineRequestDto {

    private String note;

    private LocalDateTime createDate;

    private Integer status;

}
