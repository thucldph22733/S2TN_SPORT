package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.SupplierRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.entity.Supplier;
import com.poly.springboot.service.SupplierService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/suppliers/")
@Tag(name = "Suppliers", description = "( Rest API Hiển thị, thêm, sửa, xóa nhà cung cấp )")
@Validated
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping("getAll")
    public ResponseEntity<List<Supplier>> getSuppliers() {
        List<Supplier> supplierList = supplierService.getSuppliers();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(supplierList);

    }

    @PostMapping("create")
    public ResponseEntity<ResponseDto>createSupplier(@Valid  @RequestBody SupplierRequestDto supplierRequestDto){
        Boolean isCreated = supplierService.createSupplier(supplierRequestDto);

        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateSupplier(@Valid @RequestParam SupplierRequestDto supplierRequestDto,@PathVariable Long id){

        Boolean isUpdated = supplierService.updateSupplier(supplierRequestDto,id);

        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteSupplier(@RequestParam Long id){
        Boolean isDeleted = supplierService.deleteSupplier(id);

        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

}
