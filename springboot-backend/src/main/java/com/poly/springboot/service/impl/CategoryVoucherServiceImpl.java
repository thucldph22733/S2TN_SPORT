package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CategoryVoucherRequestDto;
import com.poly.springboot.dto.responseDto.CategoryVoucherResponseDto;
import com.poly.springboot.entity.CategoryVoucher;
import com.poly.springboot.repository.CategoryVoucherRepository;
import com.poly.springboot.service.CategoryVoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryVoucherServiceImpl implements CategoryVoucherService {
    @Autowired
    private CategoryVoucherRepository repository;

    @Override
    public List<CategoryVoucherResponseDto> getCategoryVoucher() {
        return repository.findAll().stream().map(
                category -> new CategoryVoucherResponseDto(
                        category.getId(),
                        category.getCategoryName(),
                        category.getCategoryDescribe(),
                        category.getCreateDate(),
                        category.getUpdateDate())
                ).collect(Collectors.toList());
    }

    @Override
    public CategoryVoucher saveCategoryVoucher(CategoryVoucherRequestDto requestDto) {
        System.out.println(requestDto);
        CategoryVoucher categoryVoucher = new CategoryVoucher();
        categoryVoucher.setCategoryName(requestDto.getCategoryName());
        categoryVoucher.setCategoryDescribe(requestDto.getCategoryDescribe());
        categoryVoucher.setCreateDate(requestDto.getCreateDate());
        categoryVoucher.setUpdateDate(requestDto.getUpdateDate());
        System.out.println(categoryVoucher);
        return repository.save(categoryVoucher);
    }

    @Override
    public CategoryVoucher updateCategoryVoucher(CategoryVoucherRequestDto requestDto, Long id) {
        CategoryVoucher categoryVoucher = repository.findById(id).get();
        System.out.println(categoryVoucher);
        categoryVoucher.setCategoryName(requestDto.getCategoryName());
        categoryVoucher.setCategoryDescribe(requestDto.getCategoryDescribe());
        categoryVoucher.setCreateDate(requestDto.getCreateDate());
        categoryVoucher.setUpdateDate(requestDto.getUpdateDate());
        repository.save(categoryVoucher);
        return categoryVoucher;
    }

    @Override
    public String delete(Long id) {
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
