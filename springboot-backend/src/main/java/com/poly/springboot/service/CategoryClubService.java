package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CategoryClubRequestDto;
import com.poly.springboot.entity.CategoryClub;

import java.util.List;

public interface CategoryClubService {
    List<CategoryClub> getCategoryClubs();

    CategoryClub saveCategoryClub(CategoryClubRequestDto requestDto);

    CategoryClub updateCategoryClub(CategoryClubRequestDto requestDto, Long id);

    String deleteCategoryClub(Long id);

    CategoryClub findCategoryClubById(Long id);

}