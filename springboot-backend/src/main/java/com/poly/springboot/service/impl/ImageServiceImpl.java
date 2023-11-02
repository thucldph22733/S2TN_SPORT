package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.entity.Image;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.ImageRepository;
import com.poly.springboot.repository.ProductRepository;
import com.poly.springboot.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;
    @Override
    public List<Image> getImages() {
        return imageRepository.findAll();
    }

    @Override
    public Boolean saveImage(ImageRequestDto imageRequestDto) {

        Image image = new Image();

        image.setProduct(productRepository.findById(imageRequestDto.getProductId()).orElse(null));
        image.setImageName(imageRequestDto.getImageName());
        image.setImageLink(imageRequestDto.getImageLink());
        image.setImageDescribe(imageRequestDto.getImageDescribe());

        imageRepository.save(image);
        return true;
    }

    @Override
    public Boolean updateImage(ImageRequestDto imageRequestDto, Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("ảnh",String.valueOf(id)));

        image.setProduct(productRepository.findById(imageRequestDto.getProductId()).orElse(null));
        image.setImageName(imageRequestDto.getImageName());
        image.setImageLink(imageRequestDto.getImageLink());
        image.setImageDescribe(imageRequestDto.getImageDescribe());

        imageRepository.save(image);
        return true;
    }

    @Override
    public Boolean deleteImage(Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("ảnh",String.valueOf(id)));
        imageRepository.deleteById(image.getId());
        return true;
    }
}
