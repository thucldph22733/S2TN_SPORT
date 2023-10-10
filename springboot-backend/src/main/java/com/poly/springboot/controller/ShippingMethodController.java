package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ShippingMethodRequestDto;
import com.poly.springboot.entity.ShippingMethod;
import com.poly.springboot.service.ShippingMethodService;
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
@RequestMapping("/api/v1/")
public class ShippingMethodController {

    @Autowired
    private ShippingMethodService shippingMethodService;

    // get all Shipping Method rest api
    @GetMapping("shippingMethods")
    public ResponseEntity<List<ShippingMethod>> getShippingMethods(){

        List<ShippingMethod> shippingMethods = shippingMethodService.getShippingMethods();
        return ResponseEntity.ok(shippingMethods);
    }

    //get Shipping Method by id rest api
    @GetMapping("shippingMethod/{id}")
    public ResponseEntity<ShippingMethod> getShippingMethod(@PathVariable Long id){

        ShippingMethod shippingMethod = shippingMethodService.findShippingMethodById(id);
        return ResponseEntity.ok(shippingMethod);
    }

    //create Shipping Method rest api
    @PostMapping("create-shippingMethod")
    public ResponseEntity<ShippingMethod> createShippingMethod(@RequestBody ShippingMethodRequestDto methodRequestDto){

        ShippingMethod shippingMethod = shippingMethodService.saveShippingMethod(methodRequestDto);

        return ResponseEntity.ok(shippingMethod);
    }

    //update Shipping Method rest api
    @PutMapping("update-shippingMethod/{id}")
    public ResponseEntity<ShippingMethod> updateShippingMethod(@RequestBody ShippingMethodRequestDto methodRequestDto,@PathVariable Long id){

        ShippingMethod shippingMethod = shippingMethodService.updateShippingMethod(methodRequestDto,id);

        return ResponseEntity.ok(shippingMethod);
    }

    //delete Shipping Method rest api
    @DeleteMapping("delete-shippingMethod/{id}")
    public ResponseEntity<String> deleteShippingMethod(@PathVariable Long id){

        String message = shippingMethodService.deleteShippingMethod(id);
        return ResponseEntity.ok(message);
    }
}
