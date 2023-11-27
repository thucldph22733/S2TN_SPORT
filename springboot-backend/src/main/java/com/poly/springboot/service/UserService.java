package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    Page<UserResponseDto> getUsers(Pageable pageable);

//    Boolean createUser(UserRequestDto requestDto);
//
//    Boolean updateUser(UserRequestDto requestDto, Long id);
//
//    Boolean deleteUser(Long id);

}
