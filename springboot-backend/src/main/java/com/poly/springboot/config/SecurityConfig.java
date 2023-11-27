package com.poly.springboot.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
//Lớp SecurityConfig dùng để cấu hình bảo mật
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;
//    private final LogoutHandler logoutHandler;

    //mảng chứa các đường dẫn được cho phép truy cập mà không cần xác thực.
    private static final String[] WHITE_LIST_URL = {
            "" +
                    "/api/v1/**",
            "/api/v1/auth/**",
            "/api/v1/roles/**",
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
//                                .requestMatchers("/api/v1/brands/**").hasAnyAuthority("ADMIN","USER")
//                                .requestMatchers("/api/v1/colors/**").hasAuthority("ADMIN")
//                                .requestMatchers("/api/v1/clubs/**").hasAuthority("USER")
                                .anyRequest()
                                .authenticated()

                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)  // xác thực người dùng
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//                .logout(logout ->
//                        logout.logoutUrl("/api/v1/auth/logout") //đường dẫn đăng xuất
//                                .addLogoutHandler(logoutHandler)  //Khi người dùng đăng xuất, logoutHandler được gọi và sau đó SecurityContextHolder được xóa để đảm bảo là người dùng không được xác thực nữa.
//                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
//                )
        ;

        return http.build();
    }
}