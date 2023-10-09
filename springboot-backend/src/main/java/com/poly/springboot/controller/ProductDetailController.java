package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.service.ProductDetailService;
import com.poly.springboot.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ProductDetailController {

   @Autowired
   private ProductDetailService productDetail;

    @GetMapping("productdetail")
    public ResponseEntity<List<ProductDetailResponseDto>> getProductDetail() {
        List<ProductDetailResponseDto> a = productDetail.findAll();
        return ResponseEntity.ok(a);
    }

    @GetMapping("productdetail/{id}")
    public ResponseEntity<ProductDetail> findById(@PathVariable Long id){
        ProductDetail productdetail = productDetail.findById(id);
        return ResponseEntity.ok(productdetail);
    }

    @PostMapping("create-productdetail")
    public ResponseEntity<ProductDetail> create(@RequestBody ProductDetailRequestDto productRequestDto){
        ProductDetail productdetail = productDetail.save(productRequestDto);
        return ResponseEntity.ok(productdetail);
    }

    @PutMapping("update-productdetail/{id}")
    public ResponseEntity<ProductDetail> update(@RequestBody ProductDetailRequestDto productRequestDto, @PathVariable Long id){
        ProductDetail productdetail = productDetail.update(productRequestDto,id);
        return ResponseEntity.ok(productdetail);
    }

    @DeleteMapping("delete-productdetail/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = productDetail.delete(id);
        return ResponseEntity.ok(mes);
    }
}
