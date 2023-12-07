//package com.poly.springboot.config;
//
//
//import com.poly.springboot.repository.TokenRepository;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.logout.LogoutHandler;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class LogoutService implements LogoutHandler {
//
//    private final TokenRepository tokenRepository;
//
//    //Phương thức này triển khai logout từ giao diện LogoutHandler.
//    @Override
//    public void logout(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            Authentication authentication
//    ) {
//        //Lấy giá trị của header "Authorization" từ yêu cầu HTTP, chứa thông tin xác thực.
//        final String authHeader = request.getHeader("Authorization");
//        final String jwtToken;
//
//        /*Kiểm tra xem header "Authorization" có tồn tại và có bắt đầu bằng chuỗi "Bearer" không.
//        Nếu không, phương thức kết thúc và không thực hiện thêm thao tác. */
//        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        //Nếu header hợp lệ, cắt chuỗi để lấy giá trị của token JWT từ chuỗi "Bearer token".
//        jwtToken = authHeader.substring(7);
//        var storedToken = tokenRepository.findByToken(jwtToken)
//                .orElse(null);
//        if (storedToken != null) {
//            /* Nếu token được tìm thấy trong cơ sở dữ liệu, tiến hành đánh dấu token là đã hết hạn và bị thu hồi (revoked),
//             sau đó lưu lại thông tin token cập nhật vào cơ sở dữ liệu.*/
//            storedToken.setExpired(true);
//            storedToken.setRevoked(true);
//            tokenRepository.save(storedToken);
//
//            //xóa bất kỳ dữ liệu xác thực nào khỏi SecurityContextHolder, đảm bảo rằng người dùng không được xác thực sau khi đăng xuất.
//            SecurityContextHolder.clearContext();
//        }
//    }
//}
//
