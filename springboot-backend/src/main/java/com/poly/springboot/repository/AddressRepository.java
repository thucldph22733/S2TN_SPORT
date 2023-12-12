package com.poly.springboot.repository;

import com.poly.springboot.entity.Address;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("SELECT a FROM Address a JOIN a.users u WHERE u.id = :userId")
    List<Address> findAddressesByUserId(@Param("userId") Long userId);
    List<Address> findByUsersId(Long userId);
}
