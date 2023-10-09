package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductDetailResponseDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.entity.Size;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.ProductService;
import com.poly.springboot.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private SupplierReppsitory supplierReppsitory;

    @Override
    public List<ProductResponseDto> findAll() {
        return productRepository.findAll().stream().map(product -> new ProductResponseDto(
                product.getId(),
                product.getCategory().getCategoryName(),
                product.getClub().getClubName(),
                product.getBrand().getBrandName(),
                product.getSupplier().getSupplierName(),
                product.getProductName(),
                product.getProductAvatar(),
                product.getProductHot(),
                product.getProductSale(),
                product.getProductNew(),
                product.getViewCount(),
                product.getProductDescribe(),
                product.getIsDefault(),
                product.getCreateBy(),
                product.getUpdateBy())
        ).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> getPage(Integer pageNo) {
        return null;
    }

    @Override
    public String delete(Long id) {
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public Product findById(Long id) {
        Optional<Product> result = productRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Product save(ProductRequestDto productRequestDto) {
        Product product = new Product();

        product.setCategory(categoryRepository.findById(productRequestDto.getCategoryId()).orElse(null));
        product.setClub(clubRepository.findById(productRequestDto.getClubId()).orElse(null));
        product.setBrand(brandRepository.findById(productRequestDto.getBrandId()).orElse(null));
        product.setSupplier(supplierReppsitory.findById(productRequestDto.getSupplierId()).orElse(null));
        product.setProductName(productRequestDto.getProductName());
        product.setProductAvatar(productRequestDto.getProductAvatar());
        product.setProductHot(productRequestDto.getProductHot());
        product.setProductSale(productRequestDto.getProductSale());
        product.setProductNew(productRequestDto.getProductNew());
        product.setViewCount(productRequestDto.getViewCount());
        product.setProductName(productRequestDto.getProductName());
        product.setIsDefault(productRequestDto.getIsDefault());
        product.setCreateBy(productRequestDto.getCreateBy());
        product.setUpdateBy(productRequestDto.getUpdateBy());

        productRepository.save(product);
        return product;
    }

    @Override
    public Product update(ProductRequestDto productRequestDto, Long id) {
        Product product = productRepository.findById(id).get();

        product.setCategory(categoryRepository.findById(productRequestDto.getCategoryId()).orElse(null));
        product.setClub(clubRepository.findById(productRequestDto.getClubId()).orElse(null));
        product.setBrand(brandRepository.findById(productRequestDto.getBrandId()).orElse(null));
        product.setSupplier(supplierReppsitory.findById(productRequestDto.getSupplierId()).orElse(null));
        product.setProductName(productRequestDto.getProductName());
        product.setProductAvatar(productRequestDto.getProductAvatar());
        product.setProductHot(productRequestDto.getProductHot());
        product.setProductSale(productRequestDto.getProductSale());
        product.setProductNew(productRequestDto.getProductNew());
        product.setViewCount(productRequestDto.getViewCount());
        product.setProductName(productRequestDto.getProductName());
        product.setIsDefault(productRequestDto.getIsDefault());
        product.setCreateBy(productRequestDto.getCreateBy());
        product.setUpdateBy(productRequestDto.getUpdateBy());

        productRepository.save(product);
        return product;
    }
}
