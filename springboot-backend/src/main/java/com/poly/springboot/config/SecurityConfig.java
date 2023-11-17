package com.poly.springboot.config;

import com.poly.springboot.entity.Staff;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import static com.poly.springboot.entity.Permission.ADMIN_CREATE;
import static com.poly.springboot.entity.Permission.ADMIN_DELETE;
import static com.poly.springboot.entity.Permission.ADMIN_READ;
import static com.poly.springboot.entity.Permission.ADMIN_UPDATE;
import static com.poly.springboot.entity.Permission.STAFF_READ;
import static com.poly.springboot.entity.Permission.STAFF_CREATE;
import static com.poly.springboot.entity.Permission.STAFF_UPDATE;
import static com.poly.springboot.entity.Role.ADMIN;
import static com.poly.springboot.entity.Role.STAFF;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
//Lớp SecurityConfig dùng để cấu hình bảo mật
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    //mảng chứa các đường dẫn được cho phép truy cập mà không cần xác thực.
    private static final String[] WHITE_LIST_URL = {"/api/v1/auth/**",
            "/api/staffs**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/swagger-ui.html"};

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)  //Vô hiệu hóa CSRF (Cross-Site Request Forgery) vì ứng dụng sử dụng token JWT để xác thực thay vì CSRF token.
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL) // Không yêu cầu xác thực
                                .permitAll()

                                .requestMatchers("/api/brands/**").hasAnyRole(ADMIN.name(), STAFF.name())
                                .requestMatchers(GET, "/api/brands/**").hasAnyAuthority(ADMIN_READ.name(), STAFF_READ.name())
                                .requestMatchers(POST, "/api/brands/**").hasAnyAuthority(ADMIN_CREATE.name(), STAFF_CREATE.name())
                                .requestMatchers(PUT, "/api/brands/**").hasAnyAuthority(ADMIN_UPDATE.name(), STAFF_UPDATE.name())
                                .requestMatchers(DELETE, "/api/brands/**").hasAnyAuthority(ADMIN_DELETE.name())

                                //Staff
                                .requestMatchers("/api/staffs/**").hasAnyRole(ADMIN.name())
                                .requestMatchers(GET, "/api/staffs/**").hasAnyAuthority(ADMIN_READ.name())
                                .requestMatchers(POST, "/api/staffs/**").hasAnyAuthority(ADMIN_CREATE.name())
                                .requestMatchers(PUT, "/api/staffs/**").hasAnyAuthority(ADMIN_UPDATE.name())
                                .requestMatchers(DELETE, "/api/staffs/**").hasAnyAuthority(ADMIN_DELETE.name())
                                 //Customer
                                .requestMatchers("/api/customers/**").hasAnyRole(ADMIN.name(),STAFF.name())
                                .requestMatchers(GET, "/api/customers/**").hasAnyAuthority(ADMIN_READ.name(),STAFF.name())
                                .requestMatchers(POST, "/api/customers/**").hasAnyAuthority(ADMIN_CREATE.name(),STAFF.name())
                                .requestMatchers(PUT, "/api/customers/**").hasAnyAuthority(ADMIN_UPDATE.name(),STAFF.name())
                                .requestMatchers(DELETE, "/api/customers/**").hasAnyAuthority(ADMIN_DELETE.name())
                                //Product
                                .requestMatchers("/api/products/**").hasAnyRole(ADMIN.name(),STAFF.name())
                                .requestMatchers(GET, "/api/products/**").hasAnyAuthority(ADMIN_READ.name(),STAFF.name())
                                .requestMatchers(POST, "/api/products/**").hasAnyAuthority(ADMIN_CREATE.name(),STAFF.name())
                                .requestMatchers(PUT, "/api/products/**").hasAnyAuthority(ADMIN_UPDATE.name(),STAFF.name())
                                .requestMatchers(DELETE, "/api/products/**").hasAnyAuthority(ADMIN_DELETE.name())
                                .anyRequest() //Tất cả các yêu cầu khác yêu cầu xác thực.
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)  // xác thực người dùng
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout") //đường dẫn đăng xuất
                                .addLogoutHandler(logoutHandler)  //Khi người dùng đăng xuất, logoutHandler được gọi và sau đó SecurityContextHolder được xóa để đảm bảo là người dùng không được xác thực nữa.
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
        ;

        return http.build();
    }
}