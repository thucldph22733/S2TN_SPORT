package com.poly.springboot.service.impl;

import com.poly.springboot.config.JwtService;
import com.poly.springboot.dto.requestDto.LoginRequestDto;
import com.poly.springboot.dto.requestDto.RefreshTokenRequestDto;
import com.poly.springboot.dto.requestDto.RegisterRequestDto;
import com.poly.springboot.dto.responseDto.JwtAuthenticationResponseDto;
import com.poly.springboot.dto.responseDto.RegisterResponseDto;
import com.poly.springboot.entity.Role;
import com.poly.springboot.entity.User;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.RoleRepository;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    private  final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private  final AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    @Override
    public RegisterResponseDto register(RegisterRequestDto registerRequestDto) {

        List<Role> roles = roleRepository.findAllByRoleNameIn(registerRequestDto.roles());
        User user = User.builder()
                .userName(registerRequestDto.userName())
                .phoneNumber(registerRequestDto.phoneNumber())
                .email(registerRequestDto.email())
                .password(passwordEncoder.encode(registerRequestDto.password()))
                .roles(roles)
                .build();
        userRepository.save(user);
        return this.userMapper(user);
    }

    @Override
    public JwtAuthenticationResponseDto login(LoginRequestDto loginRequestDto) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequestDto.getEmail(),
                loginRequestDto.getPassword()));

        var user = userRepository.findByEmail(loginRequestDto.getEmail()).orElseThrow(()->new ResourceNotFoundException("Không tìm thấy email này!"));
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

//        Trả về một đối tượng AuthenticationResponseDto chứa access token và refresh token để trả về cho người dùng.
        return JwtAuthenticationResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public JwtAuthenticationResponseDto refreshToken(RefreshTokenRequestDto refreshTokenRequestDto) {
       String userEmail = jwtService.extractUsername(refreshTokenRequestDto.getToken());
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy email người  này!"));
        //Kiểm Tra Tính Hợp Lệ của Refresh Token
            if (jwtService.isTokenValid(refreshTokenRequestDto.getToken(), user)) {
                // Xác thực thành công, tiếp tục quá trình refresh token.
                String accessToken = jwtService.generateToken(user);


                //Trả về access token và refresh token mới thông qua đối tượng
                return JwtAuthenticationResponseDto.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshTokenRequestDto.getToken())
                        .build();
            }
        return null;
    }

    public RegisterResponseDto userMapper(User user) {
        RegisterResponseDto registerResponseDto = new RegisterResponseDto(
                user.getEmail(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getPassword(),
                user.getRoles().stream().map(Role::getRoleName).toList()
        );
        return registerResponseDto;
    }
}
