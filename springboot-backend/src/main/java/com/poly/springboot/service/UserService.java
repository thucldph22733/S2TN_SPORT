package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ChangePasswordRequestDto;
import com.poly.springboot.dto.requestDto.UserFilterRequestDto;
import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

public interface UserService {

    Page<UserResponseDto> getUsersByFilter(UserFilterRequestDto requestDto);

    Boolean createUser(UserRequestDto requestDto);

    Boolean updateUser(UserRequestDto requestDto, Long id);

    Boolean deleteUser(Long id);

    Boolean changePassword(ChangePasswordRequestDto request, Principal connectedUser);

    UserResponseDto getUserById(Long id);

    Integer countDeletedUsersInDateRange(LocalDateTime startDate, LocalDateTime endDate);
}
