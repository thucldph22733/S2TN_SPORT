package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.dto.responseDto.ProductUserResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private BrandRepository brandRepository;
    private SupplierRepository supplierRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository,
                              BrandRepository brandRepository,
                              SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
        this.supplierRepository = supplierRepository;
    }
    @Override
    public Page<ProductResponseDto> getProducts(String name, List<Boolean> status, Pageable pageable) {
        Page<Product> productPage;

        if (name == null && status == null) {
            productPage = productRepository.findAll(pageable);
        } else if (name == null) {
            productPage = productRepository.findByDeletedIn(status, pageable);
        } else if (status == null) {
            productPage = productRepository.findByProductNameContaining(name, pageable);
        } else {
            productPage = productRepository.findByProductNameContainingAndDeletedIn(name, status, pageable);
        }
        return productPage.map(this::mapProductToDto);
    }

    @Override
    public Page<ProductUserResponseDto> getProductHomePageByProductNew(Pageable pageable) {
        return  productRepository.findProductHomePageByProductNew(pageable);
    }

    @Override
    public Page<ProductUserResponseDto> getProductHomePageByProductHot(Pageable pageable) {
        return productRepository.findProductHomePageByProductHot(pageable);
    }

    @Override
    public Page<ProductUserResponseDto> getProductHomePageByProductSale(Pageable pageable) {
        return productRepository.findProductHomePageByProductSale(pageable);
    }


//    @Override
//    public Boolean deleteProduct(Long id) {
//
//        Product product = productRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm này!"));
//
//        product.setDeleted(!product.getDeleted());
//        productRepository.save(product);
//        return true;
//    }

    @Override
    public Boolean createProduct(ProductRequestDto productRequestDto) {
        if (productRepository.existsByProductName(productRequestDto.getProductName())) {
            throw new AlreadyExistsException("Tên sản phẩm đã tồn tại!");
        }
        Product product = new Product();
        mapToProductRequest(productRequestDto,product);

        productRepository.save(product);
        return true;
    }

    @Override
    public Boolean updateProduct(ProductRequestDto productRequestDto, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm này!"));

        mapToProductRequest(productRequestDto,product);

        productRepository.save(product);
        return true;
    }

    @Override
    public List<Product> findAllByDeletedTrue() {
        return productRepository.findAllByDeletedTrue();
    }

    @Override
    public Page<ProductUserResponseDto> findProductsByFilters(List<Long> categoryIds, List<Long> brandIds, List<Long> colorIds, List<Long> materialIds, List<Long> sizeIds,
//                                                              Double minPrice, Double maxPrice,
                                                              Pageable pageable) {
        return productRepository.findProductsByFilters(categoryIds,brandIds,colorIds,materialIds,sizeIds
//                ,minPrice,maxPrice
                ,pageable);
    }


    private ProductResponseDto mapProductToDto(Product product) {
        return new ProductResponseDto(
                product.getId(),
                product.getProductName(),
                product.getCategory() != null ? product.getCategory().getCategoryName() : "",
                product.getBrand() != null ? product.getBrand().getBrandName() : " ",
                product.getSupplier() != null ? product.getSupplier().getSupplierName() : " ",
                product.getDeleted(),
                product.getCreatedAt(),
                product.getCreatedBy(),
                product.getProductDescribe(),
                product.getProductNew(),
                product.getProductHot(),
                product.getProductSale());
    }

    private Product mapToProductRequest(ProductRequestDto productRequestDto, Product product) {

        product.setProductName(productRequestDto.getProductName());
        product.setCategory(categoryRepository.findByCategoryName(productRequestDto.getCategoryName()));
        product.setBrand(brandRepository.findByBrandName(productRequestDto.getBrandName()));
        product.setSupplier(supplierRepository.findBySupplierName(productRequestDto.getSupplierName()));
        product.setProductHot(productRequestDto.getProductHot());
        product.setProductNew(productRequestDto.getProductNew());
        product.setProductSale(productRequestDto.getProductSale());
        product.setDeleted(productRequestDto.getDeleted());
        product.setProductDescribe(productRequestDto.getProductDescribe());

        return product;
    }
}
