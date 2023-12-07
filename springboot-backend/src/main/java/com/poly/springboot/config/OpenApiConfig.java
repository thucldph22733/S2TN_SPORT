package com.poly.springboot.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@OpenAPIDefinition(info = @Info(
        title = "Xây dựng website bán quần áo đá bóng S2TN SPORT",
        description = "Tài liệu API REST của Website bán quần áo đá bóng sử dụng spring boot phía backend và react phía frontend !",
        version = "v1",
        contact = @Contact(
                name = "Thanh Le",
                email = "thanhld69@gmail.com",
                url = "https://github.com/ledangthanh22/S2TN_SPORT"
        ),
        license = @License(
                name = "Apache 2.0",
                url = "https://github.com/ledangthanh22/S2TN_SPORT"
        )
)
)
public class OpenApiConfig {

}
