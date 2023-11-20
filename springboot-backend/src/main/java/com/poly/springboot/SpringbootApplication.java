package com.poly.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef = "auditAware")
public class SpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);
    }

//    @Bean
//    public CommandLineRunner commandLineRunner(
//            StaffService staffService
//    ) {
//        return args -> {
//            var admin = StaffRequestDto.builder()
//                    .staffName("admin")
//                    .email("admin@gmail.com")
//                    .password("password")
//                    .phoneNumber("0369958572")
//                    .role(ADMIN)
//                    .build();
//            System.out.println("Admin token: " + staffService.createStaff(admin));
//
//        };
//    }
}
