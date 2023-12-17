package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ChangePasswordRequestDto;
import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.security.Principal;
import java.util.List;

public interface UserService {

    Page<UserResponseDto> getUsers(String userName, String phoneNumber, String email, List<Boolean> status,Pageable pageable);

    Page<UserResponseDto> getUsersByRole(String userName, String phoneNumber, String email, List<Boolean> status,Pageable pageable);

    Boolean createUser(UserRequestDto requestDto);

    Boolean updateUser(UserRequestDto requestDto, Long id);

    Boolean deleteUser(Long id);

    Boolean changePassword(ChangePasswordRequestDto request, Principal connectedUser);

    UserResponseDto getUserById(Long id);

    Integer countDeletedUsersInDateRange();
}
