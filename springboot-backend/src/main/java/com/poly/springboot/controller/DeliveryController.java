package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.DeliveryRequestDto;
import com.poly.springboot.entity.Delivery;
import com.poly.springboot.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    // get alldelivery rest api
    @GetMapping("deliveries")
    public ResponseEntity<List<Delivery>> getDeliverys(){

        List<Delivery> shippingMethods = deliveryService.getDeliverys();
        return ResponseEntity.ok(shippingMethods);
    }

    //get delivery by id rest api
    @GetMapping("delivery/{id}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable Long id){

        Delivery shippingMethod = deliveryService.findDeliveryById(id);
        return ResponseEntity.ok(shippingMethod);
    }

    //create delivery rest api
    @PostMapping("create-delivery")
    public ResponseEntity<Delivery> createDelivery(@RequestBody DeliveryRequestDto deliveryRequestDto){

        Delivery shippingMethod = deliveryService.saveDelivery(deliveryRequestDto);

        return ResponseEntity.ok(shippingMethod);
    }

    //update delivery rest api
    @PutMapping("update-delivery/{id}")
    public ResponseEntity<Delivery> updateDelivery(@RequestBody DeliveryRequestDto deliveryRequestDto, @PathVariable Long id){

        Delivery shippingMethod = deliveryService.updateDelivery(deliveryRequestDto,id);

        return ResponseEntity.ok(shippingMethod);
    }

    //delete delivery rest api
    @DeleteMapping("delete-delivery/{id}")
    public ResponseEntity<String> deleteDelivery(@PathVariable Long id){

        String message = deliveryService.deleteDelivery(id);
        return ResponseEntity.ok(message);
    }
}
