package com.poly.springboot;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "Xây dựng website bán quần áo đá bóng S2TN SPORT",
                version = "3.0.0",
                description = "Website bán quần áo đá bóng sử dụng spring boot phía backend và react phía frontend !",
                termsOfService = "runcodenow",
                contact = @Contact(
                        name = "Thanh Lee",
                        email = "thanhld69@gmail.com"
                )
        )
)
public class SpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);
    }

}
