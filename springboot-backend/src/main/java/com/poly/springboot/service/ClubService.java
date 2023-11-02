package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.entity.Club;

import java.util.List;

public interface ClubService {
    List<Club> getClubs();

    Boolean createClub(ClubRequestDto clubRequestDto);

    Boolean updateClub(ClubRequestDto clubRequestDto,Long id);

    Boolean deleteClub(Long id);

}
