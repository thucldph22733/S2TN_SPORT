package com.poly.springboot.repository;

import java.util.List;
import java.util.Optional;

import com.poly.springboot.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(" select t from Token t inner join Staff s on t.staff.id = s.id where s.id = :id and (t.expired = false or t.revoked = false) ")
    List<Token> findAllValidTokenByStaff(Long id);
    Optional<Token> findByToken(String token);
}