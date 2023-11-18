package com.poly.springboot.repository;

import com.poly.springboot.entity.Club;
import com.poly.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club,Long> {

    Boolean existsByClubName(String clubName);

    // Lọc những bản ghi chưa bị xóa mềm
    List<User> findByIsDeletedFalse();
}
