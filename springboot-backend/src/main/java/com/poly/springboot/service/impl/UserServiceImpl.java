//package com.poly.springboot.service.impl;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.poly.springboot.config.JwtService;
//import com.poly.springboot.dto.requestDto.UserRequestDto;
//
//import com.poly.springboot.entity.User;
//import com.poly.springboot.entity.TokenType;
//import com.poly.springboot.exception.AlreadyExistsException;
//import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.repository.UserRepository;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class UserServiceImpl implements UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    private final JwtService jwtService;
//
//    private final AuthenticationManager authenticationManager;
//
//    @Autowired
//    private  TokenRepository tokenRepository;
//    private final Integer pageSize = 10;
//
//    private final PasswordEncoder passwordEncoder;
//
//    //Phương thức lấy ra danh sách nhân viên
////    @Override
////    public List<UserResponseDto> getStaffs() {
////        return userRepository.findAll().stream().map(
////                UserMapper::mapToStaffResponse
////        ).collect(Collectors.toList());
////    }
//
//    //Phương thức lấy ra danh sách nhân viên có phân trang
////    @Override
////    public List<UserResponseDto> getPagination(Integer pageNo) {
////
////        Pageable pageable = PageRequest.of(pageNo, pageSize);
////
////        return userRepository.findAll(pageable).stream().map(
////                UserMapper::mapToStaffResponse
////        ).collect(Collectors.toList());
////    }
//
//    //Phương thức lấy ra danh sách nhân viên có phân trang theo từ khóa tìm kiếm
////    @Override
////    public List<UserResponseDto> searchStaff(String keyword, Integer pageNo) {
////
////        Pageable pageable = PageRequest.of(pageNo, pageSize);
////
////        return userRepository.searchStaff(keyword, pageable).stream().map(
////                UserMapper::mapToStaffResponse
////        ).collect(Collectors.toList());
////    }
//
//    //Phương thức tạo mới một nhân viên
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
//
//    //Phương thức cập nhật lại nhân viên
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
//
//    //Phương thức xóa mềm nhân viên theo trang thái
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
//
//    //Phương thúc đang nhập bàng tài khoản nhân viên
//    @Override
//    public AuthenticationResponseDto loginStaff(AuthenticationRequestDto request) {
//
//        //Xác thực người dùng dựa trên email và mật khẩu từ AuthenticationRequestDto
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//        //Lấy thông tin nhân viên từ cơ sở dữ liệu dựa trên email.
//        User staff = userRepository.findByEmail(request.getEmail())
//                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy id nhân viên này!"));
//
//        //Tạo token và refresh token dựa trên thông tin nhân viên.
//        String jwtToken = jwtService.generateToken(staff);
//        String refreshToken = jwtService.generateRefreshToken(staff);
//
//        //Thu hồi tất cả các token hiện có của nhân viên.
//        revokeAllStaffTokens(staff);
//
//        //Lưu token mới vào cơ sở dữ liệu.
//        saveStaffToken(staff, jwtToken);
//
//        //Trả về một đối tượng AuthenticationResponseDto chứa access token và refresh token để trả về cho người dùng.
//        return AuthenticationResponseDto.builder()
//                .accessToken(jwtToken)
//                .refreshToken(refreshToken)
//                .build();
//    }
//    @Override
//    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
//
//        //Lấy giá trị của header "Authorization" từ yêu cầu HTTP để kiểm tra refresh token.
//        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//        final String refreshToken;
//        final String userEmail;
//
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        refreshToken = authHeader.substring(7);
//        userEmail = jwtService.extractUsername(refreshToken);
//
//        //Kiểm Tra Tính Hợp Lệ của Refresh Token
//        if (userEmail != null) {
//
//            //Lấy thông tin nhân viên từ cơ sở dữ liệu dựa trên email.
//            User staff = userRepository.findByEmail(userEmail)
//                    .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy email nhân viên này!"));
//
//            if (jwtService.isTokenValid(refreshToken, staff)) {
//                // Xác thực thành công, tiếp tục quá trình refresh token.
//                String accessToken = jwtService.generateToken(staff);
//                revokeAllStaffTokens(staff);
//                saveStaffToken(staff, accessToken);
//
//                //Trả về access token và refresh token mới thông qua đối tượng
//                AuthenticationResponseDto authResponse = AuthenticationResponseDto.builder()
//                        .accessToken(accessToken)
//                        .refreshToken(refreshToken)
//                        .build();
//
//                //Sử dụng ObjectMapper để viết giá trị của đối tượng response vào OutputStream của response HTTP.
//                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
//            }
//
//        }
//    }
//
//    private void revokeAllStaffTokens (User staff){
//        //Lấy danh sách tất cả các token hiện đang có hiệu lực của một nhân viên
//        List<Token> validStaffTokens = tokenRepository.findAllValidTokenByStaff(staff.getId());
//
//        //Kiểm tra xem rỗng hay không
//        if (validStaffTokens.isEmpty())
//            //Nếu rỗng thì kết thúc
//            return;
//
//        //Cập nhật lại token
//        validStaffTokens.forEach(token -> {
//            token.setExpired(true);
//            token.setRevoked(true);
//        });
//        //Lưu lại tất cả các token đã được cập nhật
//        tokenRepository.saveAll(validStaffTokens);
//    }
//
//    private void saveStaffToken (User staff, String jwtToken){
//
//        //Tạo đối tượng Token mới
//        Token token = Token.builder()
//                .users(staff)
//                .token(jwtToken)
//                .tokenType(TokenType.BEARER)
//                .expired(false)
//                .revoked(false)
//                .build();
//        //Lưu Token
//        tokenRepository.save(token);
//    }
//}
