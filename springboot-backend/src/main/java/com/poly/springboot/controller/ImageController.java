package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Image;
import com.poly.springboot.service.ImageService;
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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/images/")
@Tag(name = "Images",description = "( Rest API Hiển thị, thêm, sửa, xóa ảnh )")
@Validated
public class ImageController {

    @Autowired
    private ImageService imageService;

    // get all Image rest api
    @GetMapping("getAll")
    public ResponseEntity<List<Image>> getImages() {

        List<Image> imageList = imageService.getImages();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(imageList);
    }

    @GetMapping("findImageByProductId")
    public ResponseEntity<List<Image>> findImageByProductId(@RequestParam Long productId) {

        List<Image> imageList = imageService.findImageByProductId(productId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(imageList);
    }

    @GetMapping("findImageByImageLink")
    public ResponseEntity<List<Image>> findImageByImageLink(@RequestParam String imageLink) {

        List<Image> imageList = imageService.findByImageLink(imageLink);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(imageList);
    }

    //create Image rest api
    @PostMapping("create")
    public ResponseEntity<ResponseDto> creatImage( @RequestBody List<ImageRequestDto> imageRequestDto) {

        Boolean isCreated = imageService.createImages(imageRequestDto);

        if(isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    //update Image rest api
    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateImage(@Valid @RequestBody ImageRequestDto imageRequestDto, @RequestParam Long id) {

        Boolean isUpdated = imageService.updateImage(imageRequestDto, id);

        if(isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    //delete Image rest api
    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteImage(@RequestParam Long id) {

        Boolean isDeleted = imageService.deleteImage(id);

        if(isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
}