package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.entity.Product;


public class ProductMapper {


    public static Product mapToProductRequest(Product product, ProductRequestDto productRequestDto) {

        product.setProductName(productRequestDto.getProductName());
        product.setAvatar(productRequestDto.getAvatar());
        product.setProductHot(productRequestDto.getProductHot());
        product.setProductSale(productRequestDto.getProductSale());
        product.setProductNew(productRequestDto.getProductNew());
        product.setProductName(productRequestDto.getProductName());
        product.setDeleted(productRequestDto.getStatus());

        return product;
    }

    public static ProductResponseDto mapToProductResponse(Product product, ProductResponseDto productResponseDto) {

        productResponseDto.setId(product.getId());
        productResponseDto.setCategoryName(product.getCategory().getCategoryName());
        productResponseDto.setClubName(product.getClub().getClubName());
        productResponseDto.setBrandName(product.getBrand().getBrandName());
        productResponseDto.setSupplierName(product.getSupplier().getSupplierName());
        productResponseDto.setProductName(product.getProductName());
        productResponseDto.setAvatar(product.getAvatar());
        productResponseDto.setProductHot(product.getProductHot());
        productResponseDto.setProductSale(product.getProductSale());
        productResponseDto.setProductNew(product.getProductNew());
        productResponseDto.setProductName(product.getProductName());
        productResponseDto.setStatus(product.getDeleted());

        return productResponseDto;
    }
}
