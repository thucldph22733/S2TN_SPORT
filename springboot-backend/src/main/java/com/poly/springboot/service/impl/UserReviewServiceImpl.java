package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.UserReviewRequestDto;
import com.poly.springboot.dto.responseDto.UserReviewResponseDto;
import com.poly.springboot.entity.Customer;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.entity.UserReview;
import com.poly.springboot.repository.CustomerRepository;
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

    private CustomerRepository customerRepository;

    private OrderDetailRepository orderDetailRepository;

    @Autowired
    public UserReviewServiceImpl(UserReviewRepository userReviewRepository,
                                 CustomerRepository customerRepository,
                                 OrderDetailRepository orderDetailRepository) {
        this.userReviewRepository = userReviewRepository;
        this.customerRepository = customerRepository;
        this.orderDetailRepository = orderDetailRepository;
    }

    @Override
    public List<UserReviewResponseDto> getUserReviews() {
        return userReviewRepository.findAll().stream().map(
                userReview ->
                        new UserReviewResponseDto(
                                userReview.getId(),
                                userReview.getCustomer().getAvatar(),
                                userReview.getCustomer().getFirstName() + " " + userReview.getCustomer().getLastName(),
                                userReview.getRatingValue(),
                                userReview.getUserComment(),
                                userReview.getCreateDate()
                        )
        ).collect(Collectors.toList());
    }

    @Override
    public UserReview saveUserReview(UserReviewRequestDto userReviewRequestDto) {
        //find customer by id
        Customer customer = customerRepository.findById(userReviewRequestDto.getCustomerId()).orElse(null);
        //find order detail by id
        OrderDetail orderDetail = orderDetailRepository.findById(userReviewRequestDto.getOrderDetailId()).orElse(null);

        UserReview userReview = new UserReview();

        userReview.setCustomer(customer);
        userReview.setOrderDetail(orderDetail);
        userReview.setRatingValue(userReviewRequestDto.getRatingValue());
        userReview.setUserComment(userReviewRequestDto.getUserComment());

        userReviewRepository.save(userReview);
        return userReview;
    }

    @Override
    public UserReview updateUserReview(UserReviewRequestDto userReviewRequestDto, Long id) {
        //find customer by id
        Customer customer = customerRepository.findById(userReviewRequestDto.getCustomerId()).orElse(null);
        //find order detail by id
        OrderDetail orderDetail = orderDetailRepository.findById(userReviewRequestDto.getOrderDetailId()).orElse(null);
        //find user review by id
        UserReview userReview = userReviewRepository.findById(id).get();
        //Neu tim thay id thi set lai roi luu
        userReview.setCustomer(customer);
        userReview.setOrderDetail(orderDetail);
        userReview.setRatingValue(userReviewRequestDto.getRatingValue());
        userReview.setUserComment(userReviewRequestDto.getUserComment());

        userReviewRepository.save(userReview);
        return userReview;
    }

    @Override
    public String deleteUserReview(Long id) {
        //Check xem id co ton tai ko
        if (userReviewRepository.existsById(id)) {
            //Neu co thi xoa va thong bao
            userReviewRepository.deleteById(id);
            return "Delete success!";
        } else {
            //Neu ko tra ve thong bao
            return "This id was not found: " + id;
        }
    }
}
