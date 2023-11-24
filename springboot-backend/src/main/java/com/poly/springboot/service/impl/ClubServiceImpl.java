package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.entity.Club;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.ClubRepository;
import com.poly.springboot.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubServiceImpl implements ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Override
    public Page<Club> getClubs(String name, List<Boolean> status, Pageable pageable) {

        Page<Club> ClubList;

        if (name == null && status == null){
            ClubList = clubRepository.findAll(pageable);
        }else if (name == null){
            ClubList = clubRepository.findByDeletedIn(status,pageable);
        }else if (status == null){
            ClubList = clubRepository.findByClubNameContaining(name,pageable);
        }else {
            ClubList = clubRepository.findByClubNameContainingAndDeletedIn(name,status,pageable);
        }
        return ClubList;
    }

    @Override
    public Boolean deleteClub(Long id) {

        Club club = clubRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id câu lạc bộ này!"));
        club.setDeleted(!club.getDeleted());

        clubRepository.save(club);

        return  true;
    }



    @Override
    public Boolean createClub(ClubRequestDto clubRequestDto) {

        Club club = new Club();

        club.setTypeClub(clubRequestDto.getTypeClub());
        club.setClubDescribe(clubRequestDto.getClubDescribe());
        club.setClubName(clubRequestDto.getClubName());
        club.setDeleted(clubRequestDto.getDeleted());
        if (clubRepository.existsByClubName(clubRequestDto.getClubName())){
            throw new AlreadyExistsException("Tên câu lạc bộ đã tồn tại!");
        }
        clubRepository.save(club);

        return true;

    }

    @Override
    public Boolean updateClub(ClubRequestDto clubRequestDto, Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id câu lạc bộ này!"));

        club.setTypeClub(clubRequestDto.getTypeClub());
        club.setClubDescribe(clubRequestDto.getClubDescribe());
        club.setClubName(clubRequestDto.getClubName());
        club.setDeleted(clubRequestDto.getDeleted());
        clubRepository.save(club);

        return true;

    }
}
