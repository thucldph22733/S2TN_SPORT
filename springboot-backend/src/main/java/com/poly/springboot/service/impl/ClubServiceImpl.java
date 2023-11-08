package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.entity.Club;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.ClubRepository;
import com.poly.springboot.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Override
    public List<Club> getClubs() {
        return clubRepository.findAll();
    }

    @Override
    public Boolean deleteClub(Long id) {

        Club club = clubRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Câu lạc bộ",String.valueOf(id)));

        clubRepository.deleteById(club.getId());
        return  true;
    }



    @Override
    public Boolean createClub(ClubRequestDto clubRequestDto) {

        Club club = new Club();

        club.setCategoryClub(clubRequestDto.getCategoryClub());
        club.setClubDescribe(clubRequestDto.getClubDescribe());
        club.setClubName(clubRequestDto.getClubName());

        if (clubRepository.existsByClubName(clubRequestDto.getClubName())){
            throw new AlreadyExistsException("Tên câu lạc bộ đã tồn tại!");
        }
        clubRepository.save(club);

        return true;

    }

    @Override
    public Boolean updateClub(ClubRequestDto clubRequestDto, Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Câu lạc bộ",String.valueOf(id)));

        club.setCategoryClub(clubRequestDto.getCategoryClub());
        club.setClubDescribe(clubRequestDto.getClubDescribe());
        club.setClubName(clubRequestDto.getClubName());
        clubRepository.save(club);

        return true;

    }
}
