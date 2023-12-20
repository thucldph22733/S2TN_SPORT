package com.poly.springboot.controller;

import com.poly.springboot.constants.NotificationConstants;
import com.poly.springboot.dto.requestDto.DeliveryRequestDto;
import com.poly.springboot.dto.responseDto.ResponseDto;
import com.poly.springboot.dto.responseDto.ResponseHandler;
import com.poly.springboot.entity.Delivery;
import com.poly.springboot.service.DeliveryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/deliveries/")
@Tag(name = "Deliveries",description = "( Rest API Hiển thị, thêm, sửa, xóa phương thức vận chuyển )")
@Validated
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    // get all delivery rest api
    @GetMapping("getAll")
    public ResponseEntity<?> getDeliveries(@RequestParam(defaultValue = "0") Integer pageNo,
                                      @RequestParam(defaultValue = "10") Integer pageSize,
                                      @RequestParam(required = false) String name,
                                      @RequestParam(required = false) List<Boolean> status) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Delivery> deliveryPage = deliveryService.getDeliveries(name, status, pageable);
        List<Delivery> deliveryList = deliveryPage.getContent();
        return ResponseHandler
                .generateResponse(
                        HttpStatus.OK,
                        deliveryList,
                        deliveryPage);
    }


    //create delivery rest api
    @PostMapping("create")
    public ResponseEntity<ResponseDto> createDelivery(@Valid @RequestBody DeliveryRequestDto deliveryRequestDto){

        Boolean isCreated = deliveryService.createDelivery(deliveryRequestDto);

        if (isCreated){
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(NotificationConstants.STATUS_201,NotificationConstants.MESSAGE_201));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    //update delivery rest api
    @PutMapping("update")
    public ResponseEntity<ResponseDto> updateDelivery(@Valid @RequestBody DeliveryRequestDto deliveryRequestDto, @RequestParam Long id){

        Boolean isUpdated = deliveryService.updateDelivery(deliveryRequestDto,id);

        if (isUpdated){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }

    //delete delivery rest api
    @DeleteMapping("delete")
    public ResponseEntity<ResponseDto> deleteDelivery(@RequestParam Long id){

        Boolean isDeleted = deliveryService.deleteDelivery(id);

        if (isDeleted){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(NotificationConstants.STATUS_200,NotificationConstants.MESSAGE_200));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(NotificationConstants.STATUS_500,NotificationConstants.MESSAGE_500));
        }
    }
}
