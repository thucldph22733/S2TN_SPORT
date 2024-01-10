package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VoucherFilterRequestDto {

    private String keyword;

    private LocalDateTime createdAtStart;

    private LocalDateTime createdAtEnd;

    private Boolean status;

    private Integer pageNo;

    private Integer pageSize;
}
