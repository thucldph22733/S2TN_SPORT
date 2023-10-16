package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CategoryClubRequestDto;
import com.poly.springboot.entity.CategoryClub;
import com.poly.springboot.repository.CategoryClubRepository;
import com.poly.springboot.service.CategoryClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryClubServiceImpl implements CategoryClubService {
    @Autowired
    private CategoryClubRepository categoryClubRepository;

    @Override
    public List<CategoryClub> getCategoryClubs() {
        return categoryClubRepository.findAll();
    }

    @Override
    public CategoryClub saveCategoryClub(CategoryClubRequestDto requestDto) {

        System.out.println(requestDto);
        CategoryClub categoryVoucher = new CategoryClub();
        categoryVoucher.setCategoryClubName(requestDto.getCategoryClubName());
        categoryVoucher.setCategoryClubDescribe(requestDto.getCategoryClubDescribe());
        System.out.println(categoryVoucher);
        return categoryClubRepository.save(categoryVoucher);
    }

    @Override
    public CategoryClub updateCategoryClub(CategoryClubRequestDto requestDto, Long id) {
        CategoryClub categoryVoucher = categoryClubRepository.findById(id).get();
        System.out.println(categoryVoucher);
        categoryVoucher.setCategoryClubName(requestDto.getCategoryClubName());
        categoryVoucher.setCategoryClubDescribe(requestDto.getCategoryClubDescribe());
        categoryClubRepository.save(categoryVoucher);
        return categoryVoucher;
    }

    @Override
    public String deleteCategoryClub(Long id) {
        if (categoryClubRepository.existsById(id)){
            categoryClubRepository.deleteById(id);
            return "Xoá Thành Công";
        }else{
            return "Không tìm thấy id"+id;
        }
    }

    @Override
    public CategoryClub findCategoryClubById(Long id) {
        Optional<CategoryClub> result = categoryClubRepository.findById(id);
        return result.isPresent()?result.get():null;
    }
}
