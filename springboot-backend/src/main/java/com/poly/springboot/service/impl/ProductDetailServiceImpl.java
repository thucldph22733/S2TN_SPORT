package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    private ProductDetailRepository productDetailRepository;
    private ProductRepository productRepository;
    private ColorRepository colorRepository;
    private MaterialRepository materialRepository;
    private SizeRepository sizeRepository;
    @Autowired
    public ProductDetailServiceImpl(ProductDetailRepository productDetailRepository,
                                    ProductRepository productRepository,
                                    ColorRepository colorRepository,
                                    MaterialRepository materialRepository,
                                    SizeRepository sizeRepository) {
        this.productDetailRepository = productDetailRepository;
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.materialRepository = materialRepository;
        this.sizeRepository = sizeRepository;
    }


    @Override
    public List<ProductDetailResponseDto> getProductDetails() {

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
                        productDetail.getStatus())

        ).collect(Collectors.toList());
    }


    @Override
    public List<ProductDetailResponseDto> getPagination(Integer pageNo) {

        List<ProductDetailResponseDto> productDetailResponseDtoList = productDetailRepository.findAll().stream().map(
                productDetail -> new ProductDetailResponseDto(
                        productDetail.getId(),
                        productDetail.getProduct().getProductName(),
                        productDetail.getColor().getColorName(),
                        productDetail.getMaterial().getMaterialName(),
                        productDetail.getSize().getSizeName(),
                        productDetail.getQuantity(),
                        productDetail.getPrice(),
                        productDetail.getPromotionPrice(),
                        productDetail.getStatus())

        ).collect(Collectors.toList());
        return productDetailResponseDtoList;
    }

    @Override
    public Boolean deleteProductDetail(Long id) {
        ProductDetail productDetail = productDetailRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("sản phẩm chi tiết",String.valueOf(id)));

        if (productDetail.getStatus() == 0){
            productDetail.setStatus(1);
        }else {
            productDetail.setStatus(0);
        }
        productDetailRepository.save(productDetail);
        return true;
    }

//    @Override
//    public ProductDetail findById(Long id) {
//        Optional<ProductDetail> result = productDetailRepository.findById(id);
//        return result.isPresent() ? result.get() : null;
//    }


    @Override
    public Boolean createProductDetail(ProductDetailRequestDto productDetailRequestDto) {
        ProductDetail productDetail = new ProductDetail();

        productDetail.setProduct(productRepository.findById(productDetailRequestDto.getProductId()).orElse(null));
        productDetail.setColor(colorRepository.findById(productDetailRequestDto.getColorId()).orElse(null));
        productDetail.setMaterial(materialRepository.findById(productDetailRequestDto.getMaterialId()).orElse(null));
        productDetail.setSize(sizeRepository.findById(productDetailRequestDto.getSizeId()).orElse(null));
        productDetail.setQuantity(productDetailRequestDto.getQuantity());
        productDetail.setPrice(productDetailRequestDto.getPrice());
        productDetail.setPromotionPrice(productDetailRequestDto.getPromotionPrice());
        productDetail.setStatus(0);
        productDetail.setCreateBy(productDetailRequestDto.getCreateBy());
        productDetail.setUpdateBy(productDetailRequestDto.getUpdateBy());

        productDetailRepository.save(productDetail);
        return true;

    }

    @Override
    public Boolean updateProductDetail(ProductDetailRequestDto productDetailRequestDto, Long id) {
        ProductDetail productDetail = productDetailRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("sản phẩm chi tiết",String.valueOf(id)));

        productDetail.setProduct(productRepository.findById(productDetailRequestDto.getProductId()).orElse(null));
        productDetail.setColor(colorRepository.findById(productDetailRequestDto.getColorId()).orElse(null));
        productDetail.setMaterial(materialRepository.findById(productDetailRequestDto.getMaterialId()).orElse(null));
        productDetail.setSize(sizeRepository.findById(productDetailRequestDto.getSizeId()).orElse(null));
        productDetail.setQuantity(productDetailRequestDto.getQuantity());
        productDetail.setPrice(productDetailRequestDto.getPrice());
        productDetail.setPromotionPrice(productDetailRequestDto.getPromotionPrice());
        productDetail.setStatus(0);
        productDetail.setCreateBy(productDetailRequestDto.getCreateBy());
        productDetail.setUpdateBy(productDetailRequestDto.getUpdateBy());

        productDetailRepository.save(productDetail);
        return true;
    }

}
