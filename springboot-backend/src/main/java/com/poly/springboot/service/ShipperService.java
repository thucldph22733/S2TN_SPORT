package com.poly.springboot.service;

import com.poly.springboot.dto.requestDto.ShipperRequestDto;
import com.poly.springboot.dto.responseDto.ShipperResponseDto;
import com.poly.springboot.entity.Shipper;

import java.util.List;

public interface ShipperService {

    List<ShipperResponseDto> getShippers();

    Shipper saveShipper(ShipperRequestDto requestDto);

    Shipper updateShipper(ShipperRequestDto requestDto,Long id);

    String delete(Long id);

    Shipper findShipperById(Long id);

}
