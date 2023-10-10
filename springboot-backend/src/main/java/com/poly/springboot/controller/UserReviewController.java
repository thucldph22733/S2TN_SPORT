package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.dto.requestDto.UserReviewRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.dto.responseDto.UserReviewResponseDto;
import com.poly.springboot.entity.CartDetail;
import com.poly.springboot.entity.UserReview;
import com.poly.springboot.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserReviewController {

    @Autowired
    private UserReviewService userReviewService;

    //get all user review rest api
    @GetMapping("userReviews")
    public ResponseEntity<List<UserReviewResponseDto>> getUserReviews() {
        List<UserReviewResponseDto> userReviewResponseDtoList = userReviewService.getUserReviews();
        return ResponseEntity.ok(userReviewResponseDtoList);
    }
    // create user review rest api
    @PostMapping("create-userReview")
    public ResponseEntity<UserReview> saveUserReview(@RequestBody UserReviewRequestDto userReviewRequestDto){
        UserReview userReview = userReviewService.saveUserReview(userReviewRequestDto);
        return ResponseEntity.ok(userReview);
    }

    // update user review rest api
    @PutMapping("update-userReview")
    public ResponseEntity<UserReview> updateUserReview(@RequestBody UserReviewRequestDto userReviewRequestDto, @PathVariable Long id){
        UserReview userReview = userReviewService.updateUserReview(userReviewRequestDto,id);
        return ResponseEntity.ok(userReview);
    }

    // delete user review rest api
    @DeleteMapping("delete-userReview")
    public ResponseEntity<String> deleteUserReview(@PathVariable Long id){
        String message = userReviewService.deleteUserReview(id);
        return ResponseEntity.ok(message);
    }

}
