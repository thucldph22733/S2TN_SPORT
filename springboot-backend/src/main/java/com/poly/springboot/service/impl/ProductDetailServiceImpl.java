package com.poly.springboot.service.impl;

import com.poly.springboot.dto.responseDto.MaterialInfoResponseDto;
import com.poly.springboot.dto.requestDto.PDUpdateRequestDto;
import com.poly.springboot.dto.requestDto.ProductDetailFilterRequestDto;
import com.poly.springboot.dto.requestDto.ProductDetailRequestDto;
import com.poly.springboot.dto.responseDto.*;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Page<ProductDetailResponseDto> getProductDetails(ProductDetailFilterRequestDto requestDto) {

        Pageable pageable = PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize());

        return productDetailRepository
                .getProductDetails(requestDto.getColorId(),
                        requestDto.getSizeId(),
                        requestDto.getMaterialId(),
                        requestDto.getBrandId(),
                        requestDto.getPriceMin(),
                        requestDto.getPriceMax(),
                        requestDto.getCategoryId(),
                        requestDto.getKeyword(),
                        pageable);
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
    public Page<ProductDetailResponseDto> findAllByProductId(Long id,Pageable pageable) {
        return productDetailRepository.findAllByProductId(id,pageable);
    }

    @Override
    public Boolean createProductDetail(ProductDetailRequestDto requestDto) {
        ProductDetail productDetail = new ProductDetail();

        productDetail.setProduct(productRepository.findById(requestDto.getProductId()).orElse(null));
        productDetail.setColor(colorRepository.findByColorName(requestDto.getColorName()));
        productDetail.setSize(sizeRepository.findBySizeName(requestDto.getSizeName()));
        productDetail.setMaterial(materialRepository.findByMaterialName(requestDto.getMaterialName()));
        productDetail.setQuantity(requestDto.getQuantity());
        productDetail.setPrice(requestDto.getPrice());
        productDetail.setDeleted(true);

        productDetailRepository.save(productDetail);
        return true;
    }

    @Override
    public Boolean createProductDetails(List<ProductDetailRequestDto> productDetailRequestDtos) {
        List<ProductDetail> productDetails = new ArrayList<>();

        for (ProductDetailRequestDto productDetailRequestDto : productDetailRequestDtos) {
            ProductDetail productDetail = new ProductDetail();

            productDetail.setProduct(productRepository.findById(productDetailRequestDto.getProductId()).orElse(null));
            productDetail.setColor(colorRepository.findByColorName(productDetailRequestDto.getColorName()));
            productDetail.setSize(sizeRepository.findBySizeName(productDetailRequestDto.getSizeName()));
            productDetail.setMaterial(materialRepository.findByMaterialName(productDetailRequestDto.getMaterialName()));
            productDetail.setQuantity(productDetailRequestDto.getQuantity());
            productDetail.setPrice(productDetailRequestDto.getPrice());
            productDetail.setDeleted(true);

            productDetails.add(productDetail);
        }

        productDetailRepository.saveAll(productDetails);
        return true;
    }

    @Override
    public ProductDetailInfoResponseDto getProductDetailsByProductId(Long productId) {
        return productDetailRepository.getProductDetailsByProductId(productId);
    }

    @Override
    public PDUpdateResponseDto findQuantityAndPriceByProductIdAndColorIdAndSizeId(PDUpdateRequestDto  pdUpdateRequestDto) {
        return productDetailRepository.findProductDetail(
                pdUpdateRequestDto.getProductId(),
                pdUpdateRequestDto.getColorId(),
                pdUpdateRequestDto.getMaterialId(),
                pdUpdateRequestDto.getSizeId());
    }

    @Override
    public ProductDetail findProductDetailById(Long productId) {
        return productDetailRepository.findProductDetailById(productId);
    }


    @Override
    public Boolean updateProductDetail(ProductDetailRequestDto requestDto, Long id) {
        ProductDetail productDetail = productDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm chi tiết này!"));

        productDetail.setProduct(productRepository.findById(requestDto.getProductId()).orElse(null));
        productDetail.setColor(colorRepository.findByColorName(requestDto.getColorName()));
        productDetail.setSize(sizeRepository.findBySizeName(requestDto.getSizeName()));
        productDetail.setMaterial(materialRepository.findByMaterialName(requestDto.getMaterialName()));
        productDetail.setQuantity(requestDto.getQuantity());
        productDetail.setPrice(requestDto.getPrice());
        productDetail.setDeleted(true);

        productDetailRepository.save(productDetail);
        return true;
    }


    @Override
    public List<SizeInfoResponseDto> getSizeNamesByProductId(Long productId) {
        return productDetailRepository.findSizeNamesByProductId(productId);    }

    @Override
    public List<MaterialInfoResponseDto> getMaterialNamesByProductId(Long productId) {
        return productDetailRepository.findMaterialNamesByProductId(productId);
    }

    @Override
    public List<ColorInfoResponseDto> getColorNamesByProductId(Long productId) {
        return productDetailRepository.findColorNamesByProductId(productId);    }

}
