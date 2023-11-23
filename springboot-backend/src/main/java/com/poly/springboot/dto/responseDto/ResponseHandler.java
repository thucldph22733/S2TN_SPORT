package com.poly.springboot.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {

    public static ResponseEntity<?> generateResponse(HttpStatus status, Object data, Page<?> pages) {
        Map<String, Object> map = new HashMap<>();

        map.put("data", data);
        map.put("totalCount", pages.getTotalElements());
        map.put("pagination",
                new ResponseHandler.PagingAndFilteringResponse(
                        pages.getSize(),
                        pages.getNumber() + 1,
                        pages.getTotalPages()));

        return new ResponseEntity<>(map, status);
    }

    @Data
    @AllArgsConstructor
    private static class PagingAndFilteringResponse {
        private Integer pageSize;
        private Integer currentPage;
        private Integer totalPages;
    }
}
