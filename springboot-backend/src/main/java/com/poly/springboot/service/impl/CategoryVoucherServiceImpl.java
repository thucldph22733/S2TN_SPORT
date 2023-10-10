package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CategoryVoucherRequestDto;
import com.poly.springboot.entity.CategoryVoucher;
import com.poly.springboot.repository.CategoryVoucherRepository;
import com.poly.springboot.service.CategoryVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryVoucherServiceImpl implements CategoryVoucherService {
    @Autowired
    private CategoryVoucherRepository repository;

    @Override
    public List<CategoryVoucher> getCategoryVouchers() {
        return repository.findAll();
    }

    @Override
    public CategoryVoucher saveCategoryVoucher(CategoryVoucherRequestDto requestDto) {

        System.out.println(requestDto);
        CategoryVoucher categoryVoucher = new CategoryVoucher();
        categoryVoucher.setCategoryName(requestDto.getCategoryName());
        categoryVoucher.setCategoryDescribe(requestDto.getCategoryDescribe());
        System.out.println(categoryVoucher);
        return repository.save(categoryVoucher);
    }

    @Override
    public CategoryVoucher updateCategoryVoucher(CategoryVoucherRequestDto requestDto, Long id) {
        CategoryVoucher categoryVoucher = repository.findById(id).get();
        System.out.println(categoryVoucher);
        categoryVoucher.setCategoryName(requestDto.getCategoryName());
        categoryVoucher.setCategoryDescribe(requestDto.getCategoryDescribe());
        repository.save(categoryVoucher);
        return categoryVoucher;
    }

    @Override
    public String deleteCategoryVoucher(Long id) {
        if (repository.existsById(id)){
            repository.deleteById(id);
            return "Xoá Thành Công";
        }else{
            return "Không tìm thấy id"+id;
        }
    }

    @Override
    public CategoryVoucher findCategoryVoucherById(Long id) {
        Optional<CategoryVoucher> result = repository.findById(id);
        return result.isPresent()?result.get():null;
    }
}
