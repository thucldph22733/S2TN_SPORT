package com.poly.springboot.repository;

import com.poly.springboot.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.userName LIKE %:keyword% OR u.phoneNumber LIKE %:keyword% OR u.email LIKE %:keyword% ")
    List<User> searchStaff(@Param("keyword") String keyword, Pageable pageable);

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByPhoneNumber(String phoneNumber);


}
