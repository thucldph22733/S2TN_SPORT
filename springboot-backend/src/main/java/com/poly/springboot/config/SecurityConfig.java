package com.poly.springboot.config;

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
import static com.poly.springboot.entity.Permission.STAFF_DELETE;
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
public class SecurityConfig {

    private static final String[] WHITE_LIST_URL = {"/api/v1/auth/**",
            "/v2/api-docs",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/swagger-ui.html"};

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
//    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/api/brands/**").hasAnyRole(ADMIN.name(), STAFF.name())
                                .requestMatchers(GET, "/api/brands/**").hasAnyAuthority(ADMIN_READ.name(), STAFF_READ.name())
                                .requestMatchers(POST, "/api/brands/**").hasAnyAuthority(ADMIN_CREATE.name(), STAFF_CREATE.name())
                                .requestMatchers(PUT, "/api/brands/**").hasAnyAuthority(ADMIN_UPDATE.name(), STAFF_UPDATE.name())
                                .requestMatchers(DELETE, "/api/brands/**").hasAnyAuthority(ADMIN_DELETE.name())
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
//                .logout(logout ->
//                        logout.logoutUrl("/api/v1/auth/logout")
//                                .addLogoutHandler(logoutHandler)
//                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
//                )
        ;

        return http.build();
    }
}