package com.poly.springboot;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import static com.poly.springboot.entity.Role.ADMIN;
import static com.poly.springboot.entity.Role.STAFF;
import com.poly.springboot.entity.Staff;
import com.poly.springboot.service.AuthenticationService;
import com.poly.springboot.service.StaffService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class SpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);
    }


//    @Bean
//    public CommandLineRunner commandLineRunner(
//            AuthenticationService service
//    ) {
//        return args -> {
//            var admin = StaffRequestDto.builder()
//                    .staffName("admin")
//                    .email("admin@gmail.com")
//                    .password("password")
//                    .role(ADMIN)
//                    .build();
//            System.out.println("Admin token: " + service.register(admin).getAccessToken());
//
//            var manager = StaffRequestDto.builder()
//                    .staffName("thanh")
//                    .email("thanh@gmail.com")
//                    .password("password")
//                    .role(STAFF)
//                    .build();
//            System.out.println("Staff token: " + service.register(manager).getAccessToken());
//        };
//    }
}
