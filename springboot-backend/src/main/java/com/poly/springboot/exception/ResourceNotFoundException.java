package com.poly.springboot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String resourceName, String fieldValue){
        super(String.format(" Không tìm thấy %s với dữ liệu đầu vào đã cho : '%s'", resourceName, fieldValue));
    }
}
