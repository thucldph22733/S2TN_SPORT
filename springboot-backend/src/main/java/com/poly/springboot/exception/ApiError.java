package com.poly.springboot.exception;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public record ApiError(
         String apiPath,
         HttpStatus errorCode,
         String errorMessage,
         LocalDateTime errorTime
) {
}
