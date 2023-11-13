package com.poly.springboot.config;

import com.poly.springboot.entity.Staff;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class ApplicationAuditAware implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        // Lấy thông tin xác thực từ SecurityContextHolder
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        // Kiểm tra xem người dùng có đăng nhập không
        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken
        ) {
            return Optional.empty();
        }

        // Lấy thông tin người dùng thực hiện thao tác từ Principal
        Staff userPrincipal = (Staff) authentication.getPrincipal();

        // Trả về Optional chứa ID của người dùng thực hiện thao tác
        return Optional.ofNullable(userPrincipal.getId());
    }
}
