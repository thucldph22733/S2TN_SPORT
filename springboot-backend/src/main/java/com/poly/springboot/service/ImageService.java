package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.entity.Image;

import java.util.List;

public interface ImageService {

    List<Image> getImages();

    Boolean createImage(ImageRequestDto imageRequestDto);

    Boolean updateImage(ImageRequestDto imageRequestDto,Long id);

    Boolean deleteImage(Long id);

    List<Image> findImageByProductId(Long id);
}
