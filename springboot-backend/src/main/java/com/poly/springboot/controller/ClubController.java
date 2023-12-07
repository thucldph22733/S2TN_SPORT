package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.ClubRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.entity.Club;
import com.poly.springboot.service.ClubService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/clubs/")
@Tag(name = "Clubs", description = "( Rest API Hiển thị, thêm, sửa, xóa câu lạc bộ )")
@Validated
public class ClubController {

    @Autowired
    private ClubService clubService;

    @GetMapping("getAll")
    public ResponseEntity<?> getClubs(@RequestParam(defaultValue = "0") Integer pageNo,
                                      @RequestParam(defaultValue = "10") Integer pageSize,
                                      @RequestParam(required = false) String name,
                                      @RequestParam(required = false) List<Boolean> status,
                                      @RequestParam(required = false) List<String> typeClub
    ) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Club> clubPage = clubService.getClubs(name, status, typeClub, pageable);
        List<Club> clubList = clubPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        clubList,
                        clubPage);
    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto> createClub(@RequestBody ClubRequestDto clubRequestDto) {
        Boolean isCreated = clubService.createClub(clubRequestDto);

        if (isCreated) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateClub(@RequestBody ClubRequestDto clubRequestDto, @RequestParam Long id) {
        Boolean isUpdated = clubService.updateClub(clubRequestDto, id);
        if (isUpdated) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteClub(@RequestParam Long id) {
        Boolean isDeleted = clubService.deleteClub(id);
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
        }
    }
}
