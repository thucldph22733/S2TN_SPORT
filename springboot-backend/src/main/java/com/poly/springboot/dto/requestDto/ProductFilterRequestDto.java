package com.poly.springboot.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterRequestDto {

    private Integer pageNo;
    private Integer pageSize;
    private List<Long> categoryIds;
    private List<Long> brandIds;
    private List<Long> colorIds;
    private List<Long> materialIds;
    private List<Long> sizeIds;
    private Double minPrice;
    private Double maxPrice;
    private String productName;

}
