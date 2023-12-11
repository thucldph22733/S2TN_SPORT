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
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndDeletedTrue(String email);

    Boolean existsByEmail(String email);

    Boolean existsByPhoneNumber(String phoneNumber);

    Page<User> findByUsersNameContaining(String userName, Pageable pageable);
    Page<User> findByPhoneNumberContaining(String phoneNumber,Pageable pageable);
    Page<User> findByEmailContaining(String email,Pageable pageable);
    Page<User> findByDeletedIn(List<Boolean> status, Pageable pageable);
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

    @Query("SELECT COUNT(u) FROM User u WHERE u.deleted = true ")
    Integer countDeletedUsersInDateRange();
}
