package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ProductRequestDto;
import com.poly.springboot.dto.responseDto.ProductResponseDto;
import com.poly.springboot.entity.Product;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.ProductMapper;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    private CategoryRepository categoryRepository;

    private ClubRepository clubRepository;

    private BrandRepository brandRepository;

    private SupplierRepository supplierRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository,
                              ClubRepository clubRepository,
                              BrandRepository brandRepository,
                              SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.clubRepository = clubRepository;
        this.brandRepository = brandRepository;
        this.supplierRepository = supplierRepository;
    }


    @Override
    public List<ProductResponseDto> getProducts() {
        return productRepository.findAll()
                .stream().map(product -> ProductMapper.mapToProductResponse(product, new ProductResponseDto())
                ).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> getPagination(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        List<ProductResponseDto> list = productRepository.findAll(pageable)
                .stream().map(product -> ProductMapper.mapToProductResponse(product, new ProductResponseDto())
                ).collect(Collectors.toList());
        return list;
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
    public Boolean createProduct(ProductRequestDto productRequestDto) {
        Product product = new Product();

        product.setCategory(categoryRepository.findById(productRequestDto.getCategoryId()).orElse(null));
        product.setClub(clubRepository.findById(productRequestDto.getClubId()).orElse(null));
        product.setBrand(brandRepository.findById(productRequestDto.getBrandId()).orElse(null));
        product.setSupplier(supplierRepository.findById(productRequestDto.getSupplierId()).orElse(null));
        ProductMapper.mapToProductRequest(product, productRequestDto);
        product.setDeleted(productRequestDto.getStatus());
        if (productRepository.existsByProductName(productRequestDto.getProductName())) {
            throw new AlreadyExistsException("Tên sản phẩm đã tồn tại!");
        }
        productRepository.save(product);
        return true;
    }

    @Override
    public Boolean updateProduct(ProductRequestDto productRequestDto, Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm này!"));

        product.setCategory(categoryRepository.findById(productRequestDto.getCategoryId()).orElse(null));
        product.setClub(clubRepository.findById(productRequestDto.getClubId()).orElse(null));
        product.setBrand(brandRepository.findById(productRequestDto.getBrandId()).orElse(null));
        product.setSupplier(supplierRepository.findById(productRequestDto.getSupplierId()).orElse(null));
        ProductMapper.mapToProductRequest(product, productRequestDto);

        productRepository.save(product);
        return true;
    }

    @Override
    public Product findProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm này!"));

        return product;
    }
}
