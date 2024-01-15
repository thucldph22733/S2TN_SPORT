package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.entity.Image;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.ColorRepository;
import com.poly.springboot.repository.ImageRepository;
import com.poly.springboot.repository.ProductDetailRepository;
import com.poly.springboot.repository.ProductRepository;
import com.poly.springboot.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public Boolean createImages(List<ImageRequestDto> imageRequestDtos) {
        List<Image> images = new ArrayList<>();

        boolean isFirstImageSet = false; // Biến flag để kiểm tra xem đã đặt deleted cho ảnh đầu tiên chưa

        for (ImageRequestDto imageRequestDto : imageRequestDtos) {
            Image image = new Image();
            image.setProduct(productRepository.findById(imageRequestDto.getProductId()).orElse(null));
            image.setImageName(imageRequestDto.getImageName());
            image.setImageLink(imageRequestDto.getImageLink());
            image.setImageType(imageRequestDto.getImageType());

            // Nếu chưa đặt deleted cho ảnh đầu tiên, đặt giá trị deleted thành true
            if (!isFirstImageSet) {
                image.setDeleted(true);
                isFirstImageSet = true; // Đặt lại flag để không còn là ảnh đầu tiên
            } else {
                // Nếu không phải ảnh đầu tiên, kiểm tra xem deleted được cung cấp hay không
                if (imageRequestDto.getDeleted() != null) {
                    image.setDeleted(imageRequestDto.getDeleted());
                } else {
                    // Nếu không được cung cấp, đặt giá trị mặc định là false
                    image.setDeleted(false);
                }
            }

            images.add(image);
        }

        imageRepository.saveAll(images);
        return true;
    }



    @Override
    public Boolean updateImage(ImageRequestDto imageRequestDto, Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id ảnh này!"));

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
    public List<Image> findImageByProductId(Long productId) {

        List<Image> imageList = imageRepository.findImageByProductId(productId);

        return imageList;
    }


    @Override
    public List<Image> findByImageLink(String imageLink) {
        return imageRepository.findByImageLink(imageLink);
    }
}