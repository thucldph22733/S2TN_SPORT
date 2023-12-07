package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.entity.Voucher;
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
                        productDetail.getProduct().getProductAvatar(),
                        productDetail.getColor().getColorName(),
                        productDetail.getMaterial().getMaterialName(),
                        productDetail.getSize().getSizeName(),
                        productDetail.getQuantity(),
                        productDetail.getPrice(),
                        productDetail.getPromotionPrice(),
                        productDetail.getDeleted())

        ).collect(Collectors.toList());
    }


    @Override
    public List<ProductDetailResponseDto> getPagination(Integer pageNo) {

        List<ProductDetailResponseDto> productDetailResponseDtoList = productDetailRepository.findAll().stream().map(
                productDetail -> new ProductDetailResponseDto(
                        productDetail.getId(),
                        productDetail.getProduct().getProductName(),
                        productDetail.getProduct().getProductAvatar(),
                        productDetail.getColor().getColorName(),
                        productDetail.getMaterial().getMaterialName(),
                        productDetail.getSize().getSizeName(),
                        productDetail.getQuantity(),
                        productDetail.getPrice(),
                        productDetail.getPromotionPrice(),
                        productDetail.getDeleted())

        ).collect(Collectors.toList());
        return productDetailResponseDtoList;
    }

    @Override
    public Boolean deleteProductDetail(Long id) {
        ProductDetail productDetail = productDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm chi tiết này!"));

        productDetail.setDeleted(!productDetail.getDeleted());
        productDetailRepository.save(productDetail);
        return true;
    }

    @Override
    public ProductDetail findByIdProductDetailsId(Long id) {
        ProductDetail productDetail = productDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn", String.valueOf(id)));
        return productDetail;
    }


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
        productDetail.setDeleted(productDetailRequestDto.getStatus());

        productDetailRepository.save(productDetail);
        return true;

    }

    @Override
    public Boolean updateProductDetail(ProductDetailRequestDto productDetailRequestDto, Long id) {
        ProductDetail productDetail = productDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm chi tiết này!"));

        productDetail.setProduct(productRepository.findById(productDetailRequestDto.getProductId()).orElse(null));
        productDetail.setColor(colorRepository.findById(productDetailRequestDto.getColorId()).orElse(null));
        productDetail.setMaterial(materialRepository.findById(productDetailRequestDto.getMaterialId()).orElse(null));
        productDetail.setSize(sizeRepository.findById(productDetailRequestDto.getSizeId()).orElse(null));
        productDetail.setQuantity(productDetailRequestDto.getQuantity());
        productDetail.setPrice(productDetailRequestDto.getPrice());
        productDetail.setPromotionPrice(productDetailRequestDto.getPromotionPrice());
        productDetail.setDeleted(productDetailRequestDto.getStatus());

        productDetailRepository.save(productDetail);
        return true;
    }

}
