package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.UserReviewRequestDto;
import com.poly.springboot.dto.responseDto.UserReviewResponseDto;
import com.poly.springboot.entity.UserReview;
import org.apache.catalina.User;

import java.util.List;

public interface UserReviewService {

    List<UserReviewResponseDto> getUserReviews();

    UserReview saveUserReview(UserReviewRequestDto userReviewRequestDto);

    UserReview updateUserReview(UserReviewRequestDto userReviewRequestDto,Long id);

    String deleteUserReview(Long id);

}
