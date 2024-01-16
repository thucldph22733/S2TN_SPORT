package com.poly.springboot.service.impl;


import com.poly.springboot.dto.requestDto.ChangePasswordRequestDto;
import com.poly.springboot.dto.requestDto.UserFilterRequestDto;
import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import com.poly.springboot.entity.User;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.repository.RoleRepository;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    @Override
    public Page<UserResponseDto> getUsersByFilter(UserFilterRequestDto requestDto) {
        Pageable pageable = PageRequest.of(requestDto.getPageNo(), requestDto.getPageSize());
        Page<User> userPage = userRepository
                .getUsersByFilter(
                        requestDto.getKeyword(),
                        requestDto.getBirthOfDay(),
                        requestDto.getGender(),
                        requestDto.getStatus(),
                        pageable);
        return userPage.map(this::mapUserToDto);
    }

    @Override
    public Boolean createUser(UserRequestDto requestDto) {

//        List<Role> roleList = roleRepository.findAllByRoleNameIn(requestDto.getRoleList());

        User user = new User();
        user.setUsersName(requestDto.getUserName());
        user.setPhoneNumber(requestDto.getPhoneNumber());
            user.setEmail(requestDto.getEmail());
        user.setGender(requestDto.getGender());
        user.setBirthOfDay(requestDto.getBirthOfDay());
        if (requestDto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        }
        user.setDeleted(requestDto.getDeleted());
        user.setRole(requestDto.getRole());

        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean updateUser(UserRequestDto requestDto, Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id nhân viên này!"));
//        List<Role> roleList = roleRepository.findAllByRoleNameIn(requestDto.getRoleList());
        user.setUsersName(requestDto.getUserName());
        user.setPhoneNumber(requestDto.getPhoneNumber());
        user.setEmail(requestDto.getEmail());
        user.setGender(requestDto.getGender());
        user.setBirthOfDay(requestDto.getBirthOfDay());
        user.setDeleted(requestDto.getDeleted());
        user.setRole(requestDto.getRole());

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

    @Override
    public Boolean changePassword(ChangePasswordRequestDto request, Principal connectedUser) {
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new AlreadyExistsException("Sai mật khẩu");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new AlreadyExistsException("Mật khẩu không giống nhau");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        userRepository.save(user);

        return true;
    }

    private UserResponseDto mapUserToDto(User user) {
        return new UserResponseDto(user.getId(),
                user.getUsersName(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getGender(),
                user.getBirthOfDay(),
                user.getDeleted(),
//                user.getRoles().stream().map(Role::getRoleName).toList(),
                user.getRole(),
                user.getCreatedAt());

    }

    @Override
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id khách hàng này!"));
        return mapUserToDto(user);
    }

    @Override
    public Integer countDeletedUsersInDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return userRepository.countDeletedUsersInDateRange(startDate, endDate);
    }

}
