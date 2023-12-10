package com.poly.springboot.controller;

import com.poly.springboot.dto.responseDto.TimeLineResponseDto;
import com.poly.springboot.entity.TimeLine;
import com.poly.springboot.service.TimeLineService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/timeline/")
//@Tag(name = "Customers", description = "( Rest API Hiển thị, thêm, sửa, xóa, tìm kiếm, phân trang nhân viên )")
public class TimeLineController {

    @Autowired
    private TimeLineService timeLineService;

    @GetMapping("findAllTimelineByOrderId")
    public ResponseEntity<?> getAllTimelineByOrderId(@RequestParam Long id){
        List<TimeLine> response = timeLineService.findAllTimeLinesByOrderId(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("findByOrderIdAndStatus")
    public ResponseEntity<?> findByOrderIdAndStatus(@RequestParam Long id){
        List<TimeLine> response = timeLineService.findByOrderIdAndStatus(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}
