package com.poly.springboot.mapper;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.entity.Product;


public class ProductMapper {


    public static Product mapToProductRequest(Product product, ProductRequestDto productRequestDto) {

        product.setProductName(productRequestDto.getProductName());
        product.setProductAvatar(productRequestDto.getProductAvatar());
        product.setProductHot(productRequestDto.getProductHot());
        product.setProductSale(productRequestDto.getProductSale());
        product.setProductNew(productRequestDto.getProductNew());
        product.setViewCount(productRequestDto.getViewCount());
        product.setProductName(productRequestDto.getProductName());
        product.setStatus(productRequestDto.getStatus());
        product.setCreateBy(productRequestDto.getCreateBy());
        product.setUpdateBy(productRequestDto.getUpdateBy());

        return product;
    }

    public static ProductResponseDto mapToProductResponse(Product product, ProductResponseDto productResponseDto) {

        productResponseDto.setId(product.getId());
        productResponseDto.setCategoryName(product.getCategory().getCategoryName());
        productResponseDto.setClubName(product.getClub().getClubName());
        productResponseDto.setBrandName(product.getBrand().getBrandName());
        productResponseDto.setSupplierName(product.getSupplier().getSupplierName());
        productResponseDto.setProductName(product.getProductName());
        productResponseDto.setProductAvatar(product.getProductAvatar());
        productResponseDto.setProductHot(product.getProductHot());
        productResponseDto.setProductSale(product.getProductSale());
        productResponseDto.setProductNew(product.getProductNew());
        productResponseDto.setViewCount(product.getViewCount());
        productResponseDto.setProductName(product.getProductName());
        productResponseDto.setStatus(product.getStatus());

        return productResponseDto;
    }
}
