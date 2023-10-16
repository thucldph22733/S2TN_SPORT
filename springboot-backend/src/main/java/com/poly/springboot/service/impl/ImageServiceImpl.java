package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.entity.Image;
import com.poly.springboot.repository.ImageRepository;
import com.poly.springboot.repository.ProductRepository;
import com.poly.springboot.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Image saveImage(ImageRequestDto imageRequestDto) {


        Image image = new Image();

        image.setProduct(productRepository.findById(imageRequestDto.getProductId()).orElse(null));
        image.setImageName(imageRequestDto.getImageName());
        image.setImageLink(imageRequestDto.getImageLink());
        image.setImageDescribe(imageRequestDto.getImageDescribe());

        imageRepository.save(image);
        return image;
    }

    @Override
    public Image findImageById(Long id) {

        Optional<Image> result = imageRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Image updateImage(ImageRequestDto imageRequestDto, Long id) {
        Image image = imageRepository.findById(id).get();

        image.setProduct(productRepository.findById(imageRequestDto.getProductId()).orElse(null));
        image.setImageName(imageRequestDto.getImageName());
        image.setImageLink(imageRequestDto.getImageLink());
        image.setImageDescribe(imageRequestDto.getImageDescribe());

        imageRepository.save(image);
        return image;
    }

    @Override
    public String deleteImage(Long id) {
        if (imageRepository.existsById(id)){
            imageRepository.deleteById(id);
            return "Delete success!";
        }else {
            return "This id was not found: "+id;
        }
    }
}
