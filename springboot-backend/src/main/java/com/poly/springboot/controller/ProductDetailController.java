package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.service.ProductDetailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/productDetails/")
@Tag(name = "ProductDetails")
public class ProductDetailController {

   @Autowired
   private ProductDetailService productDetail;

    @GetMapping("getAll")
    public ResponseEntity<List<ProductDetailResponseDto>> getProductDetail() {
        List<ProductDetailResponseDto> a = productDetail.findAll();
        return ResponseEntity.ok(a);
    }



    @PostMapping("create")
    public ResponseEntity<ProductDetail> create(@RequestBody ProductDetailRequestDto productRequestDto){
        ProductDetail productdetail = productDetail.save(productRequestDto);
        return ResponseEntity.ok(productdetail);
    }

    @PutMapping("update")
    public ResponseEntity<ProductDetail> update(@RequestBody ProductDetailRequestDto productRequestDto, @RequestParam Long id){
        ProductDetail productdetail = productDetail.update(productRequestDto,id);
        return ResponseEntity.ok(productdetail);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> delete(@RequestParam Long id){
        String mes = productDetail.delete(id);
        return ResponseEntity.ok(mes);
    }
}
