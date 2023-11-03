package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.UserReviewRequestDto;
import com.poly.springboot.dto.responseDto.UserReviewResponseDto;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.entity.UserReview;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.OrderDetailRepository;
import com.poly.springboot.repository.UserReviewRepository;
import com.poly.springboot.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserReviewServiceImpl implements UserReviewService {

    private UserReviewRepository userReviewRepository;

    private OrderDetailRepository orderDetailRepository;

    @Autowired
    public UserReviewServiceImpl(UserReviewRepository userReviewRepository,
                                 OrderDetailRepository orderDetailRepository) {
        this.userReviewRepository = userReviewRepository;
        this.orderDetailRepository = orderDetailRepository;
    }

    @Override
    public List<UserReviewResponseDto> getUserReviews() {
        return userReviewRepository.findAll().stream().map(
                userReview ->
                        new UserReviewResponseDto(
                                userReview.getId(),
                                userReview.getOrderDetail().getOrder().getCustomer().getAvatar(),
                                userReview.getOrderDetail().getOrder().getCustomer().getCustomerName(),
                                userReview.getRatingValue(),
                                userReview.getUserComment(),
                                userReview.getCreateDate()
                        )
        ).collect(Collectors.toList());
    }

    @Override
    public Boolean createUserReview(UserReviewRequestDto userReviewRequestDto) {
        //find order detail by id
        OrderDetail orderDetail = orderDetailRepository.findById(userReviewRequestDto.getOrderDetailId()).orElse(null);

        UserReview userReview = new UserReview();

        userReview.setOrderDetail(orderDetail);
        userReview.setRatingValue(userReviewRequestDto.getRatingValue());
        userReview.setUserComment(userReviewRequestDto.getUserComment());

        userReviewRepository.save(userReview);
        return true;
    }

    @Override
    public Boolean updateUserReview(UserReviewRequestDto userReviewRequestDto, Long id) {
        //find order detail by id
        OrderDetail orderDetail = orderDetailRepository.findById(userReviewRequestDto.getOrderDetailId()).orElse(null);
        //find user review by id
        UserReview userReview = userReviewRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("đánh giá",String.valueOf(id)));
        //Neu tim thay id thi set lai roi luu
        userReview.setOrderDetail(orderDetail);
        userReview.setRatingValue(userReviewRequestDto.getRatingValue());
        userReview.setUserComment(userReviewRequestDto.getUserComment());

        userReviewRepository.save(userReview);
        return true;
    }

    @Override
    public Boolean deleteUserReview(Long id) {

        UserReview userReview = userReviewRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("đánh giá",String.valueOf(id)));

        userReviewRepository.deleteById(userReview.getId());

        return true;
    }
}
