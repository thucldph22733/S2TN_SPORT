package com.poly.springboot.repository;

import com.poly.springboot.entity.Address;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    @Query("SELECT a FROM Address a WHERE a.user.id = :userId")
    List<Address> findAddressesByUserId(@Param("userId") Long userId);

    @Query("SELECT a FROM Address a WHERE a.user.id = :userId and a.deleted = true")
    Address findAddressesByUserIdAnDeletedTrue(@Param("userId") Long userId);

    List<Address> findByUserId(Long userId);

    @Modifying
    @Query("UPDATE Address a SET a.deleted = false WHERE (a.deleted = true) AND a.user.id = :userId")
    @Transactional
    void updateDefaultAddress(@Param("userId") Long userId);
}
