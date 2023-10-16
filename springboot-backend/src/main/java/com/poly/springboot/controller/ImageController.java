package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ImageRequestDto;
import com.poly.springboot.entity.Image;
import com.poly.springboot.service.ImageService;
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
@RequestMapping("/api/")
public class ImageController {

    @Autowired
    private ImageService imageService;

    // get all Image rest api
    @GetMapping("images")
    public ResponseEntity<List<Image>> getImages() {

        List<Image> images = imageService.getImages();
        return ResponseEntity.ok(images);
    }

    //get Image by id rest api
    @GetMapping("image/{id}")
    public ResponseEntity<Image> getImage(@PathVariable Long id) {

        Image image = imageService.findImageById(id);
        return ResponseEntity.ok(image);
    }

    //create Image rest api
    @PostMapping("create-image")
    public ResponseEntity<Image> creatImage(@RequestBody ImageRequestDto imageRequestDto) {

        Image image = imageService.saveImage(imageRequestDto);

        return ResponseEntity.ok(image);
    }

    //update Image rest api
    @PutMapping("update-image/{id}")
    public ResponseEntity<Image> updateImage(@RequestBody ImageRequestDto imageRequestDto, @PathVariable Long id) {

        Image image = imageService.updateImage(imageRequestDto, id);

        return ResponseEntity.ok(image);
    }

    //delete Image rest api
    @DeleteMapping("delete-image/{id}")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {

        String message = imageService.deleteImage(id);
        return ResponseEntity.ok(message);
    }
}
