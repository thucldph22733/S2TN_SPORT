package com.poly.springboot.audit;

import com.poly.springboot.entity.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component("auditAware")
public class ApplicationAuditAware implements AuditorAware<String> {


    @Override
    public Optional<String> getCurrentAuditor() {
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
        User userPrincipal = (User) authentication.getPrincipal();

//         Trả về Optional chứa ID của người dùng thực hiện thao tác
        return Optional.ofNullable(userPrincipal.getUsersName());
    }
}
