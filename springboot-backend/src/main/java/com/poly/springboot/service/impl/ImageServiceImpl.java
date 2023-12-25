package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.entity.Image;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.ColorRepository;
import com.poly.springboot.repository.ImageRepository;
import com.poly.springboot.repository.ProductDetailRepository;
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

    @Autowired
    private ColorRepository colorRepository;
    @Override
    public List<Image> getImages() {
        return imageRepository.findAll();
    }

    @Override
    public Boolean createImage(ImageRequestDto imageRequestDto) {

        Image image = new Image();
        image.setProduct(productRepository.findById(imageRequestDto.getProductId()).orElse(null));
        image.setColor(colorRepository.findById(imageRequestDto.getColorId()).orElse(null));
        image.setImageName(imageRequestDto.getImageName());
        image.setImageLink(imageRequestDto.getImageLink());
        image.setImageType(imageRequestDto.getImageType());

        imageRepository.save(image);
        return true;
    }

    @Override
    public Boolean updateImage(ImageRequestDto imageRequestDto, Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id ảnh này!"));

        image.setColor(colorRepository.findById(imageRequestDto.getColorId()).orElse(null));
        image.setImageName(imageRequestDto.getImageName());
        image.setImageLink(imageRequestDto.getImageLink());
        image.setImageType(imageRequestDto.getImageType());

        imageRepository.save(image);
        return true;
    }

    @Override
    public Boolean deleteImage(Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id ảnh này!"));
        imageRepository.deleteById(image.getId());
        return true;
    }

    @Override
    public List<Image> findImageByProductId(Long id) {

        List<Image> imageList = imageRepository.findImageByProductId(id);

        return imageList;
    }

    @Override
    public List<Image> findByColorId(Long colorId) {
        return imageRepository.findByColorId(colorId);
    }

    @Override
    public List<Image> findByImageLink(String imageLink) {
        return imageRepository.findByImageLink(imageLink);
    }
}