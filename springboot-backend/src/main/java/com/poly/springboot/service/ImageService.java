package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.entity.Image;

import java.util.List;

public interface ImageService {

    List<Image> getImages();

    Boolean createImages(List<ImageRequestDto> imageRequestDtos);

    Boolean updateImage(ImageRequestDto imageRequestDto,Long id);

    Boolean deleteImage(Long id);

    List<Image> findImageByProductId(Long productId);

    List<Image> findByImageLink(String imageLink);
}