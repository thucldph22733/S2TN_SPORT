package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.CategoryRequestDto;
import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.entity.Category;
import com.poly.springboot.entity.Club;

import java.util.List;

public interface ClubService {
    List<Club> findAll();

    List<Club> getPage(Integer pageNo);

    String delete(Long id);

    Club findById(Long id);

    Club save(ClubRequestDto clubRequestDto);

    Club update(ClubRequestDto clubRequestDto,Long id);
}
