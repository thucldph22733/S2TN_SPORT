package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserFilterRequestDto {
    private String keyword;
    private Date birthOfDay;
    private Boolean gender;
    private Boolean status;
    private Integer pageNo;
    private Integer pageSize;
}
