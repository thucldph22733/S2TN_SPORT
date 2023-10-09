package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserReviewResponseDto {

    private Long id;

    private String customerAvatar;

    private String customerName;

    private  Integer ratingValue;

    private  String userComment;

    private LocalDateTime createDate;
}
