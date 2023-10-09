package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("product")
    public ResponseEntity<List<ProductResponseDto>> getProductDetail() {
        List<ProductResponseDto> a = productService.findAll();
        return ResponseEntity.ok(a);
    }

    @GetMapping("product/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id){
        Product product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("create-product")
    public ResponseEntity<Product> create(@RequestBody ProductRequestDto productRequestDto){
        Product product = productService.save(productRequestDto);
        return ResponseEntity.ok(product);
    }

    @PutMapping("update-product/{id}")
    public ResponseEntity<Product> update(@RequestBody ProductRequestDto productRequestDto,@PathVariable Long id){
        Product product = productService.update(productRequestDto,id);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("delete-product/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id){
        String mes = productService.delete(id);
        return ResponseEntity.ok(mes);
    }

}
