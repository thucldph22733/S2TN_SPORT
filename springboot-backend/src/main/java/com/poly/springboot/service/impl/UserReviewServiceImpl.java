package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.UserReviewRequestDto;
import com.poly.springboot.dto.responseDto.UserReviewResponseDto;
import com.poly.springboot.entity.UserReview;
import com.poly.springboot.repository.UserReviewRepository;
import com.poly.springboot.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserReviewServiceImpl implements UserReviewService {

    @Autowired
    private UserReviewRepository userReviewRepository;

    @Override
    public List<UserReviewResponseDto> getUserReviews() {
        return null;
    }

    @Override
    public UserReview saveUserReview(UserReviewRequestDto userReviewRequestDto) {
        return null;
    }

    @Override
    public UserReview updateUserReview(UserReviewRequestDto userReviewRequestDto) {
        return null;
    }
}
