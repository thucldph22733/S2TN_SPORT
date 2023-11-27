package com.poly.springboot.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poly.springboot.config.JwtService;
import com.poly.springboot.dto.requestDto.UserRequestDto;

import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.UserResponseDto;
import com.poly.springboot.entity.User;

import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;


    //Phương thức tạo mới một nhân viên
//    @Override
//    public Boolean createStaff(UserRequestDto staffRequestDto) {
//        // Kiểm tra sdt, email đã tồn tại chưa
//        Boolean isPhoneNumber = userRepository.existsByPhoneNumber(staffRequestDto.getPhoneNumber());
//        if (isPhoneNumber) {
//            throw new AlreadyExistsException("Số điện thoại này đã tồn tại !");
//        }
//        Boolean isEmail = userRepository.existsByEmail(staffRequestDto.getEmail());
//        if (isEmail) {
//            throw new AlreadyExistsException("Địa chỉ email này đã tồn tại !");
//        }
//        //Tạo mới đối tượng nhân viên
//        User staff = new User();
//        UserMapper.mapToStaffRequest(staff, staffRequestDto);
//        staff.setPassword(passwordEncoder.encode(staffRequestDto.getPassword()));
//        //Lưu nhân viên vào csdl
//        User saveStaff = userRepository.save(staff);
//
//        //Tạo Token và refreshToken
//        String jwtToken = jwtService.generateToken(staff);
//        String refreshToken = jwtService.generateRefreshToken(staff);
//
//        return true;
//    }

    //Phương thức cập nhật lại nhân viên
//    @Override
//    public Boolean updateStaff(UserRequestDto staffRequestDto, Long id) {
//        //Tìm nhân viên bằng id chuyền vào
//        User staff = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id nhân viên này!"));
//
//        //Nếu thấy nv thì cập nhật lại
//        UserMapper.mapToStaffRequest(staff, staffRequestDto);
//        staff.setPassword(passwordEncoder.encode(staffRequestDto.getPassword()));
//        //Lưu nhân viên vào CSDL
//        userRepository.save(staff);
//
//        return true;
//    }

    //Phương thức xóa mềm nhân viên theo trang thái
//    @Override
//    public Boolean deleteStaff(Long id) {
//        // Tìm nhân viên từ cơ sở dữ liệu bằng id
//        User staff = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id nhân viên này!"));
//
//        // Nếu tìm thấy nhân viên, cập nhật trạng thái xóa mềm
//        staff.setDeleted(!staff.isDeleted());
//
//        // Lưu lại nhân viên
//        userRepository.save(staff);
//
//        return true;
//    }

    @Override
    public Page<UserResponseDto> getUsers(Pageable pageable) {

        // Sử dụng Page<User> để lấy danh sách người dùng từ repository
        Page<User> userPage = userRepository.findAll(pageable);

        // Sử dụng map để chuyển đổi từ Page<User> sang Page<UserResponseDto>
        Page<UserResponseDto> userResponseDtoPage = userPage.map(user -> {
            return new UserResponseDto(
                    user.getId(),
                    user.getUsername(),
                    user.getPhoneNumber(),
                    user.getEmail(),
                    user.getGender(),
                    user.getBirthOfDay(),
                    user.getDeleted(),
                    user.getCreatedAt()
            );
        });

        return userResponseDtoPage;
    }

}
