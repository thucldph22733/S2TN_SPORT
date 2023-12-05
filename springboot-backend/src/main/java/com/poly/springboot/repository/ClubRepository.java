package com.poly.springboot.repository;

import com.poly.springboot.entity.Category;
import com.poly.springboot.entity.Club;
import com.poly.springboot.entity.Club;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club,Long> {

    Club findByClubName(String name);
    List<Club> findAllByDeletedTrue();
    Boolean existsByClubName(String ClubName);
    Page<Club> findByClubNameContaining(String name, Pageable pageable);
    Page<Club> findByDeletedIn(List<Boolean> status, Pageable pageable);
    Page<Club> findByTypeClubIn(List<String> typeClub, Pageable pageable);
    Page<Club> findByClubNameContainingAndDeletedInAndTypeClubIn(String name, List<Boolean> status,List<String> typeClub, Pageable pageable);
}
