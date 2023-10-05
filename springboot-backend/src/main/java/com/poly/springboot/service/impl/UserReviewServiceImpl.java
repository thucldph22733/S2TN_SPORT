package com.poly.springboot.service.impl;

import com.poly.springboot.repository.UserReviewRepository;
import com.poly.springboot.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserReviewServiceImpl implements UserReviewService {

    @Autowired
    private UserReviewRepository userReviewRepository;

}
