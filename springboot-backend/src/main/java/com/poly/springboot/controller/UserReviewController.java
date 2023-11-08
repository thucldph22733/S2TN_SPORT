package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.dto.requestDto.UserReviewRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.UserReviewResponseDto;
import com.poly.springboot.entity.CartDetail;
import com.poly.springboot.entity.UserReview;
import com.poly.springboot.service.UserReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/userReviews/")
@Tag(name = "UserReviews", description = "( Rest API Hiển thị, thêm, sửa, xóa đánh giá )")
@Validated
public class UserReviewController {

    @Autowired
    private UserReviewService userReviewService;

    //get all user review rest api
    @GetMapping("getAll")
    public ResponseEntity<List<UserReviewResponseDto>> getUserReviews() {
        List<UserReviewResponseDto> userReviewResponseDtoList = userReviewService.getUserReviews();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userReviewResponseDtoList);
    }
    // create user review rest api
    @PostMapping("create")
    public ResponseEntity<ResponseDto> saveUserReview(@Valid @RequestBody UserReviewRequestDto userReviewRequestDto){
        Boolean isCreated = userReviewService.createUserReview(userReviewRequestDto);
        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    // update user review rest api
    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateUserReview(@Valid @RequestBody UserReviewRequestDto userReviewRequestDto, @RequestParam Long id){
        Boolean isUpdated = userReviewService.updateUserReview(userReviewRequestDto,id);
        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    // delete user review rest api
    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteUserReview(@RequestParam Long id){
        Boolean isDeleted = userReviewService.deleteUserReview(id);
        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

}
