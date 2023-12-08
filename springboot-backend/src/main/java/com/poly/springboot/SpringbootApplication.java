package com.poly.springboot;


import com.poly.springboot.dto.requestDto.UserRequestDto;
import com.poly.springboot.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.sql.Date;

import static com.poly.springboot.entity.Role.ADMIN;
import static com.poly.springboot.entity.Role.EMPLOYEE;


@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAware")
public class SpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);
    }

//    @Bean
//    public CommandLineRunner commandLineRunner(
//            UserService userService
//    ) {
//        return args -> {
//            var admin = UserRequestDto.builder()
//                    .userName("Thanh Le")
//                    .email("admin@gmail.com")
//                    .phoneNumber("904565656")
//                    .password("123@123")
//                    .birthOfDay(new Date(20020606))
//                    .gender(true)
//                    .deleted(true)
//                    .role(ADMIN)
//                    .build();
//            userService.createUser(admin);
//
//            var employee = UserRequestDto.builder()
//                    .userName("Thanh Le")
//                    .email("employee@gmail.com")
//                    .phoneNumber("9045656567")
//                    .password("123@123")
//                    .deleted(true)
//                    .birthOfDay(new Date(20020606))
//                    .gender(true)
//                    .role(EMPLOYEE)
//                    .build();
//            userService.createUser(employee);
//
//        };
//    }
}
