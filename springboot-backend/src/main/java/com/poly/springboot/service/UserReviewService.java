package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.UserReviewRequestDto;
import com.poly.springboot.dto.responseDto.UserReviewResponseDto;

import java.util.List;

public interface UserReviewService {

    List<UserReviewResponseDto> getUserReviews();

    Boolean createUserReview(UserReviewRequestDto userReviewRequestDto);

    Boolean updateUserReview(UserReviewRequestDto userReviewRequestDto,Long id);

    Boolean deleteUserReview(Long id);

}
