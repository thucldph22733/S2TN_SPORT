package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import com.poly.springboot.entity.Supplier;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    Page<UserResponseDto> getUsers(String userName, String phoneNumber, String email, List<Boolean> status,Pageable pageable);

    Boolean createUser(UserRequestDto requestDto);

    Boolean updateUser(UserRequestDto requestDto, Long id);

    Boolean deleteUser(Long id);

}
