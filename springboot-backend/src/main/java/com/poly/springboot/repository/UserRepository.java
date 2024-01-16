package com.poly.springboot.repository;

//import com.poly.springboot.entity.Role;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndDeletedTrue(String email);

    Boolean existsByEmail(String email);

    Boolean existsByPhoneNumber(String phoneNumber);

    @Query("SELECT u FROM User u WHERE " +
            "(:keyword IS NULL OR u.usersName LIKE %:keyword% OR CAST(u.id AS STRING) = :keyword OR " +
            "u.phoneNumber LIKE %:keyword% OR u.email LIKE %:keyword%) AND " +
            "(:birthOfDay IS NULL OR u.birthOfDay = :birthOfDay) AND " +
            "(:gender IS NULL OR u.gender = :gender) AND " +
            "(:status IS NULL OR u.deleted = :status)" +
            "ORDER BY u.createdAt DESC")
    Page<User> getUsersByFilter(
            @Param("keyword") String keyword,
            @Param("birthOfDay") Date birthOfDay,
            @Param("gender") Boolean gender,
            @Param("status") Boolean status,
            Pageable pageable
    );
    @Query("SELECT u FROM User u WHERE " +
            "(LOWER(u.usersName) LIKE LOWER(CONCAT('%', :name, '%')) AND " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :phoneNumber, '%')) AND " +
            "LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
            "u.deleted IN :status")
    Page<User> findByKeyword(@Param("name") String name,@Param("phoneNumber") String phoneNumber,@Param("email") String email,@Param("status") List<Boolean> status, Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.role = 'USER'" )
    Page<User> findAllUserByRoleUser(Pageable pageable);

    @Query("SELECT u FROM User u WHERE " +
            "(LOWER(u.usersName) LIKE LOWER(CONCAT('%', :name, '%')) AND " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :phoneNumber, '%')) AND " +
            "LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
            "u.deleted IN :status AND u.role = 'USER'" )
    Page<User> findAllUserByRoleUser(@Param("name") String name,@Param("phoneNumber") String phoneNumber,@Param("email") String email,@Param("status") List<Boolean> status, Pageable pageable);

    @Query("SELECT COUNT(u) FROM User u WHERE u.deleted = true " +
            "AND (:startDate IS NULL OR u.createdAt >= :startDate) " +
            "AND (:endDate IS NULL OR u.createdAt <= :endDate)")
    Integer countDeletedUsersInDateRange(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
