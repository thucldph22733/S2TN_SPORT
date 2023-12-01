package com.poly.springboot.service.impl;


import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import com.poly.springboot.entity.Role;
import com.poly.springboot.entity.User;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.RoleRepository;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    public Page<UserResponseDto> getUsers(String name, String phoneNumber, String email, List<Boolean> status, Pageable pageable) {
        Page<User> userPage;
        if (name == null && phoneNumber == null && email == null && status == null) {
            userPage = userRepository.findAll(pageable);
        } else if (name == null && phoneNumber == null && email == null) {
            userPage = userRepository.findByDeletedIn(status, pageable);
        } else if (phoneNumber == null && email == null && status == null) {
            userPage = userRepository.findByUsersNameContaining(name, pageable);
        } else if (email == null && status == null && name == null) {
            userPage = userRepository.findByPhoneNumberContaining(phoneNumber, pageable);
        } else if (status == null && name == null && phoneNumber == null) {
            userPage = userRepository.findByEmailContaining(email, pageable);
        } else {
            userPage = userRepository.findByKeyword(name, phoneNumber, email, status, pageable);
        }
        // Sử dụng map để chuyển đổi từ Page<User> sang Page<UserResponseDto>
        return userPage.map(this::mapUserToDto);

    }

    @Override
    public Boolean createUser(UserRequestDto requestDto) {

        List<Role> roleList = roleRepository.findAllByRoleNameIn(requestDto.getRoleList());

        User user = new User();
        user.setUsersName(requestDto.getUserName());
        user.setPhoneNumber(requestDto.getPhoneNumber());
        user.setEmail(requestDto.getEmail());
        user.setGender(requestDto.getGender());
        user.setBirthOfDay(requestDto.getBirthOfDay());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setDeleted(requestDto.getDeleted());
        user.setRoles(roleList);

        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean updateUser(UserRequestDto requestDto, Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id nhân viên này!"));
        List<Role> roleList = roleRepository.findAllByRoleNameIn(requestDto.getRoleList());
        user.setUsersName(requestDto.getUserName());
        user.setPhoneNumber(requestDto.getPhoneNumber());
        user.setEmail(requestDto.getEmail());
        user.setGender(requestDto.getGender());
        user.setBirthOfDay(requestDto.getBirthOfDay());
        user.setDeleted(requestDto.getDeleted());
        user.setRoles(roleList);

        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id nhân viên này!"));

        user.setDeleted(!user.getDeleted());

        userRepository.save(user);

        return true;
    }

    private UserResponseDto mapUserToDto(User user) {
        return new UserResponseDto(user.getId(), user.getUsersName(), user.getPhoneNumber(), user.getEmail(), user.getGender(), user.getBirthOfDay(), user.getDeleted(), user.getRoles().stream().map(Role::getRoleName).toList(), user.getCreatedAt());
    }
}
