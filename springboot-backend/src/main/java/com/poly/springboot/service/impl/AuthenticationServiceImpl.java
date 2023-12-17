package com.poly.springboot.service.impl;

import com.poly.springboot.config.JwtService;
import com.poly.springboot.dto.requestDto.LoginRequestDto;
import com.poly.springboot.dto.requestDto.RefreshTokenRequestDto;
import com.poly.springboot.dto.requestDto.RegisterRequestDto;
import com.poly.springboot.dto.responseDto.JwtAuthenticationResponseDto;
import com.poly.springboot.dto.responseDto.RegisterResponseDto;
//import com.poly.springboot.entity.Role;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import com.poly.springboot.entity.Role;
import com.poly.springboot.entity.User;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.repository.RoleRepository;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

//    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    @Override
    public RegisterResponseDto register(RegisterRequestDto registerRequestDto) {

        // Kiểm tra xem vai trò "User" đã tồn tại hay chưa
//        Role userRole = roleRepository.findByRoleName("USER")
//                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy vai trò này!"));

        User user = new User();
        user.setUsersName(registerRequestDto.getUserName());
        user.setPhoneNumber(registerRequestDto.getPhoneNumber());
        user.setEmail(registerRequestDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
        user.setRole(Role.USER);
        user.setDeleted(true);


        userRepository.save(user);
        return this.userMapper(user);
    }

    @Override
    public JwtAuthenticationResponseDto login(LoginRequestDto loginRequestDto) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequestDto.getEmail(),
                    loginRequestDto.getPassword()));

            var user = userRepository.findByEmailAndDeletedTrue(loginRequestDto.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy email này!"));

            var accessToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);

            return JwtAuthenticationResponseDto.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .user(mapUserToDto(user))
                    .build();
        } catch (BadCredentialsException e) {
            // Xử lý khi mật khẩu không chính xác
            throw new AlreadyExistsException("Mật khẩu không chính xác");
        }
    }

    @Override
    public JwtAuthenticationResponseDto refreshToken(RefreshTokenRequestDto refreshTokenRequestDto) {
        String userEmail = jwtService.extractUsername(refreshTokenRequestDto.getToken());
        User user = userRepository.findByEmailAndDeletedTrue(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy email người  này!"));

        if (jwtService.isTokenValid(refreshTokenRequestDto.getToken(), user)) {
            String accessToken = jwtService.generateToken(user);

            //Trả về access token và refresh token mới thông qua đối tượng
            return JwtAuthenticationResponseDto.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshTokenRequestDto.getToken())
                    .user(mapUserToDto(user))
                    .build();
        }
        return null;
    }

    private UserResponseDto mapUserToDto(User user) {
        return new UserResponseDto(
                user.getId(),
                user.getUsersName(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getGender(),
                user.getBirthOfDay(),
                user.getDeleted(),
                user.getRole(),
                user.getCreatedAt());

    }

    public RegisterResponseDto userMapper(User user) {
        return new RegisterResponseDto(
                user.getEmail(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getPassword(),
                user.getRole()
//                user.getRoles().stream().map(Role::getRoleName).toList()
        );
    }
}
