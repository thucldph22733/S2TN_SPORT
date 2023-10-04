package com.poly.springboot.controller;

import com.poly.springboot.dto.requestDto.ShipperRequestDto;
import com.poly.springboot.dto.responseDto.ShipperResponseDto;
import com.poly.springboot.entity.Shipper;
import com.poly.springboot.service.ShipperService;
import jakarta.validation.Valid;
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
public class ShipperController {

    @Autowired
    private ShipperService shipperService;

    // get all shippers
    @GetMapping("shippers")
    public ResponseEntity<List<ShipperResponseDto>> getShippers(){

        List<ShipperResponseDto> responseDtoList = shipperService.getShippers();
        return ResponseEntity.ok(responseDtoList);

    }

    // get shipper by id rest api
    @GetMapping("shipper/{id}")
    public ResponseEntity<Shipper> getShipper(@PathVariable Long id){

        Shipper shipper = shipperService.findShipperById(id);
        return ResponseEntity.ok(shipper);

    }

    // create shipper rest api
    @PostMapping("create-shipper")
    public ResponseEntity<Shipper> createShipper( @RequestBody  ShipperRequestDto requestDto){

        Shipper shipper = shipperService.saveShipper(requestDto);
        return ResponseEntity.ok(shipper);

    }

    // update shipper rest api
    @PutMapping("update-shipper/{id}")
    public ResponseEntity<Shipper> updateShipper( @RequestBody  ShipperRequestDto requestDto, @PathVariable Long id){

        Shipper shipper = shipperService.updateShipper(requestDto,id);
        return ResponseEntity.ok(shipper);

    }

    // delete shipper rest api
    @DeleteMapping("delete-shipper/{id}")
    public ResponseEntity<String> deleteShipper(@PathVariable Long id){

        String message =  shipperService.delete(id);
        return ResponseEntity.ok(message);

    }
}
