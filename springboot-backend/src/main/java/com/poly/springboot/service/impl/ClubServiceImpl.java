package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.entity.Category;
import com.poly.springboot.entity.Club;
import com.poly.springboot.repository.ClubRepository;
import com.poly.springboot.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Override
    public List<Club> findAll() {
        return clubRepository.findAll();
    }

    @Override
    public List<Club> getPage(Integer pageNo) {
        return null;
    }

    @Override
    public String delete(Long id) {
        if (clubRepository.existsById(id)){
            clubRepository.deleteById(id);
            return "Delete Success!";
        }
        return "This is was not found!";
    }

    @Override
    public Club findById(Long id) {
        Optional<Club> result = clubRepository.findById(id);
        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Club save(ClubRequestDto clubRequestDto) {
        Club club = new Club();
        club.setClubDescribe(clubRequestDto.getClubDescribe());
        club.setClubName(clubRequestDto.getClubName());
        clubRepository.save(club);
        return club;    }

    @Override
    public Club update(ClubRequestDto clubRequestDto, Long id) {
        Club club = clubRepository.findById(id).get();

        club.setClubName(clubRequestDto.getClubName());
        club.setClubDescribe(clubRequestDto.getClubDescribe());
        clubRepository.save(club);
        return club;

    }
}
