package com.poly.springboot.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
//Lớp JwtAuthenticationFilter là một bộ lọc được sử dụng để xác thực và ủy quyền người dùng trong ứng dụng
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;

        //kiểm tra xem yêu cầu có chứa tiêu đề "Authorization" và có bắt đầu bằng chuỗi "Bearer " hay không.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

           /*Nếu không có tiêu đề "Authorization" hoặc không bắt đầu bằng "Bearer ",
           bộ lọc sẽ bỏ qua và chuyển tiếp yêu cầu đến bộ lọc tiếp theo.*/
            filterChain.doFilter(request, response);
            return;
        }


        //Nếu header hợp lệ, cắt chuỗi để lấy giá trị của token JWT từ chuỗi "Bearer token".
        jwtToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwtToken);

        //Kiểm tra xem email đã được trích xuất từ JWT không và xem người dùng đã được xác thực chưa
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            // kiểm tra tính hợp lệ của token bằng cách kiểm tra xem nó có hết hạn hay bị thu hồi không.
            if (jwtService.isTokenValid(jwtToken, userDetails) ) {

                // Nếu cả hai điều kiện đều đúng
                // Thì tạo một UsernamePasswordAuthenticationToken và cập nhật SecurityContextHolder để xác thực người dùng đã đăng nhập thành công.
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        //Bất kỳ yêu cầu nào, sau khi được xác thực hoặc bỏ qua, đều được chuyển tiếp đến bộ lọc tiếp theo trong chuỗi bộ lọc.
        filterChain.doFilter(request, response);
    }
}