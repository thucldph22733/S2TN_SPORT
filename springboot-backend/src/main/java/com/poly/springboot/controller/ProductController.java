package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/product/")
@Tag(name = "Products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("getAll")
    public ResponseEntity<List<ProductResponseDto>> getProductDetail() {
        List<ProductResponseDto> a = productService.findAll();
        return ResponseEntity.ok(a);
    }



    @PostMapping("create")
    public ResponseEntity<Product> create(@RequestBody ProductRequestDto productRequestDto){
        Product product = productService.save(productRequestDto);
        return ResponseEntity.ok(product);
    }

    @PutMapping("update")
    public ResponseEntity<Product> update(@RequestBody ProductRequestDto productRequestDto,@RequestParam Long id){
        Product product = productService.update(productRequestDto,id);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> delete(@RequestParam Long id){
        String mes = productService.delete(id);
        return ResponseEntity.ok(mes);
    }

}
