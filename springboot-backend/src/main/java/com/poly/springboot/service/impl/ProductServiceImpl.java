package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ProductDetailFilterRequestDto;
import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductFilterResponseDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.dto.responseDto.ProductUserResponseDto;
import com.poly.springboot.dto.responseDto.Top10SaleResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    public List<Top10SaleResponseDto> findTop10BestSellingProducts() {
        return productRepository.findTop10BestSellingProducts();
    }

    @Override
    public Integer getTotalStockQuantityInDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return productRepository.getTotalStockQuantityInDateRange(startDate, endDate);
    }
    @Override
    public Page<ProductFilterResponseDto> findProductsAdminByFilters(ProductDetailFilterRequestDto requestDto) {
        Pageable pageable = PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize());
        return productRepository.findProductsAdminByFilters(requestDto.getColorId(),
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
    public Page<ProductUserResponseDto> getProductHomePageByProducts(Pageable pageable) {
        return  productRepository.findProductHomePageByProducts(pageable);
    }



    @Override
    public Boolean deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm này!"));

        product.setDeleted(!product.getDeleted());
        productRepository.save(product);
        return true;
    }

    @Override
    public Product createProduct(ProductRequestDto productRequestDto) {
        if (productRepository.existsByProductName(productRequestDto.getProductName())) {
            throw new AlreadyExistsException("Tên sản phẩm đã tồn tại!");
        }
        Product product = new Product();
        mapToProductRequest(productRequestDto,product);

        productRepository.save(product);
        return product;
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
    public Product findProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy ihaamr này!"));

    }

    @Override
    public Page<ProductUserResponseDto> findProductsByFilters(List<Long> categoryIds, List<Long> brandIds, List<Long> colorIds, List<Long> materialIds, List<Long> sizeIds,
                                                              Double minPrice, Double maxPrice,String productName,
                                                              Pageable pageable) {
        return productRepository.findProductsByFilters(categoryIds,brandIds,colorIds,materialIds,sizeIds
                ,minPrice,maxPrice,productName
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
                product.getProductDescribe());
    }

    private Product mapToProductRequest(ProductRequestDto productRequestDto, Product product) {

        product.setProductName(productRequestDto.getProductName());
        product.setCategory(categoryRepository.findByCategoryName(productRequestDto.getCategoryName()));
        product.setBrand(brandRepository.findByBrandName(productRequestDto.getBrandName()));
        product.setSupplier(supplierRepository.findBySupplierName(productRequestDto.getSupplierName()));
        product.setDeleted(productRequestDto.getDeleted());
        product.setProductDescribe(productRequestDto.getProductDescribe());

        return product;
    }
}
