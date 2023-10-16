package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.entity.Image;

import java.util.List;

public interface ImageService {

    List<Image> getImages();

    Image saveImage(ImageRequestDto imageRequestDto);

    Image findImageById(Long id);

    Image updateImage(ImageRequestDto imageRequestDto,Long id);

    String deleteImage(Long id);
}
