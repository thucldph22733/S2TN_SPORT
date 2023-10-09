package com.poly.springboot.dto.requestDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserReviewRequestDto {

    private Long orderDetailId;

    private Long customerId;

    private  Integer ratingValue;

    private  String userComment;
}
