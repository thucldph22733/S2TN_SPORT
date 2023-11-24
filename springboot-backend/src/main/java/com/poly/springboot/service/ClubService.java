package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.entity.Club;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ClubService {
    Page<Club> getClubs(String name, List<Boolean> status, Pageable pageable);

    Boolean createClub(ClubRequestDto clubRequestDto);

    Boolean updateClub(ClubRequestDto clubRequestDto,Long id);

    Boolean deleteClub(Long id);

}
