//package com.poly.springboot.controller;
//
//import com.poly.springboot.constants.NotificationConstants;
//import com.poly.springboot.dto.requestDto.RoleRequestDto;
//import com.poly.springboot.dto.responseDto.ResponseDto;
//import com.poly.springboot.dto.responseDto.ResponseHandler;
//import com.poly.springboot.entity.Role;
//import com.poly.springboot.service.RoleService;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1/roles/")
//@CrossOrigin(origins = "http://localhost:3000")
//@Tag(name = "Role")
//public class RoleController {
//
//    @Autowired
//    private RoleService roleService;
//
//    @GetMapping("getAll")
//    public ResponseEntity<?> getRoles(@RequestParam(defaultValue = "0") Integer pageNo,
//                                      @RequestParam(defaultValue = "10") Integer pageSize,
//                                      @RequestParam(required = false) String name,
//                                      @RequestParam(required = false) List<Boolean> status
//                                      ) {
//
//        Pageable pageable = PageRequest.of(pageNo, pageSize);
//
//        Page<Role> rolePage = roleService.getRoles(name,status,pageable);
//
//        List<Role> roleList = rolePage.getContent();
//
//        return ResponseHandler
//                .generateResponse(
//                        HttpStatus.OK,
//                        roleList,
//                        rolePage);
//    }
//    @GetMapping("findAllByDeletedTrue")
//    public ResponseEntity<?> findAllByDeletedTrue() {
//
//        List<Role> roleList = roleService.findAllByDeletedTrue();
//
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(roleList);
//    }
//
//    @PostMapping("create")
//    public ResponseEntity<ResponseDto> createRole(@RequestBody RoleRequestDto roleRequestDto) {
//        Boolean isCreated = roleService.createRole(roleRequestDto);
//        if (isCreated) {
//            return ResponseEntity.status(HttpStatus.CREATED)
//                    .body(new ResponseDto(NotificationConstants.STATUS_201, NotificationConstants.MESSAGE_201));
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
//        }
//    }
//
//    @PutMapping ("update")
//    public ResponseEntity<ResponseDto> updateRole(@RequestBody RoleRequestDto roleRequestDto, @RequestParam Long id) {
//        Boolean isUpdated = roleService.updateRole(roleRequestDto,id);
//        if (isUpdated) {
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
//        }
//    }
//    @DeleteMapping ("delete")
//    public ResponseEntity<ResponseDto> deleteRole( @RequestParam Long id) {
//        Boolean isDeleted = roleService.deleteRole(id);
//        if (isDeleted) {
//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(new ResponseDto(NotificationConstants.STATUS_200, NotificationConstants.MESSAGE_200));
//        } else {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseDto(NotificationConstants.STATUS_500, NotificationConstants.MESSAGE_500));
//        }
//    }
//}
