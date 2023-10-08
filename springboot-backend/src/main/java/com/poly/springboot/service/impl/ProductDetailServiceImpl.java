package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<ProductDetailResponseDto> findAll() {

        return productDetailRepository.findAll().stream().map(
                productDetail -> new ProductDetailResponseDto(
                        productDetail.getId(),
                        productDetail.getProduct().getProductName(),
                        productDetail.getColor().getColorName(),
                        productDetail.getMaterial().getMaterialName(),
                        productDetail.getSize().getSizeName(),
                        productDetail.getQuantity(),
                        productDetail.getPrice(),
                        productDetail.getPromotionPrice(),
                        productDetail.getCreateBy(),
                        productDetail.getUpdateBy())
        ).collect(Collectors.toList());
    }


    @Override
    public List<ProductDetail> getPage(Integer pageNo) {
        return null;
    }

    @Override
    public String delete(Long id) {
        if(productDetailRepository.existsById(id)){
            productDetailRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public ProductDetail findById(Long id) {
        Optional<ProductDetail> result = productDetailRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }


    @Override
    public ProductDetail save(ProductDetailRequestDto productDetailRequestDto) {
        ProductDetail productDetail = new ProductDetail();

        productDetail.setProduct(productRepository.findById(productDetailRequestDto.getProductId()).orElse(null));
        productDetail.setColor(colorRepository.findById(productDetailRequestDto.getColorId()).orElse(null));
        productDetail.setMaterial(materialRepository.findById(productDetailRequestDto.getMaterialId()).orElse(null));
        productDetail.setSize(sizeRepository.findById(productDetailRequestDto.getSizeId()).orElse(null));
        productDetail.setQuantity(productDetailRequestDto.getQuantity());
        productDetail.setPrice(productDetailRequestDto.getPrice());
        productDetail.setPromotionPrice(productDetailRequestDto.getPromotionPrice());
        productDetail.setCreateBy(productDetailRequestDto.getCreateBy());
        productDetail.setUpdateBy(productDetailRequestDto.getUpdateBy());

        productDetailRepository.save(productDetail);
        return productDetail;

    }

    @Override
    public ProductDetail update(ProductDetailRequestDto productDetailRequestDto, Long id) {
        ProductDetail productDetail = productDetailRepository.findById(id).get();

        productDetail.setProduct(productRepository.findById(productDetailRequestDto.getProductId()).orElse(null));
        productDetail.setColor(colorRepository.findById(productDetailRequestDto.getColorId()).orElse(null));
        productDetail.setMaterial(materialRepository.findById(productDetailRequestDto.getMaterialId()).orElse(null));
        productDetail.setSize(sizeRepository.findById(productDetailRequestDto.getSizeId()).orElse(null));
        productDetail.setQuantity(productDetailRequestDto.getQuantity());
        productDetail.setPrice(productDetailRequestDto.getPrice());
        productDetail.setPromotionPrice(productDetailRequestDto.getPromotionPrice());
        productDetail.setCreateBy(productDetailRequestDto.getCreateBy());
        productDetail.setUpdateBy(productDetailRequestDto.getUpdateBy());

        productDetailRepository.save(productDetail);
        return productDetail;
    }

}
