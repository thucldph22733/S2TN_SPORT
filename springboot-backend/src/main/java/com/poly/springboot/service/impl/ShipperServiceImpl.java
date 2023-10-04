package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ShipperRequestDto;
import com.poly.springboot.dto.responseDto.ShipperResponseDto;
import com.poly.springboot.entity.Shipper;
import com.poly.springboot.repository.ShipperRepository;
import com.poly.springboot.service.ShipperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class ShipperServiceImpl implements ShipperService {

    @Autowired
    private ShipperRepository shipperRepository;


    @Override
    public List<ShipperResponseDto> getShippers() {

        // chuyen doi danh sach shipper sang shipperResponseDto
        return shipperRepository.findAll().stream().map(
                shipper -> new ShipperResponseDto(
                        shipper.getId(),
                        shipper.getShipperName(),
                        shipper.getPhoneNumber(),
                        shipper.getAddress(),
                        shipper.getShipperDescribe())
        ).collect(Collectors.toList());
    }

    @Override
    public Shipper saveShipper(ShipperRequestDto requestDto) {

        // Tao doi tuong shipper
        Shipper shipper = new Shipper();

        //Set shipper bang ShipperRequestDto chuyen vao roi them shipper
        shipper.setShipperName(requestDto.getShipperName());
        shipper.setPhoneNumber(requestDto.getPhoneNumber());
        shipper.setAddress(requestDto.getAddress());
        shipper.setShipperDescribe(requestDto.getShipperDescribe());
        shipperRepository.save(shipper);

        return shipper;

    }

    @Override
    public Shipper updateShipper(ShipperRequestDto requestDto, Long id) {

        // tim ra shipper co id = vs id chuyen vao
        Shipper shipper = shipperRepository.findById(id).get();

        // neu tim thay thi cap nhat lai thong tin shipper
        shipper.setShipperName(requestDto.getShipperName());
        shipper.setPhoneNumber(requestDto.getPhoneNumber());
        shipper.setAddress(requestDto.getAddress());
        shipper.setShipperDescribe(requestDto.getShipperDescribe());
        shipperRepository.save(shipper);

        return shipper;
    }

    @Override
    public String delete(Long id) {
        // Kiem tra xem co ton tai id chuyen vao ko
        if (shipperRepository.existsById(id)){
            //Neu tim thay xoa va tra ve thong bao
            shipperRepository.deleteById(id);
            return "Delete success!";
        }else {
            //Neu ko tim thay tra ve thong bao
            return "This id was not found: "+id;
        }
    }

    @Override
    public Shipper findShipperById(Long id) {

        //Tim id chuyen vao
        Optional<Shipper> result = shipperRepository.findById(id);

        //Neu thay tra ve shipper do
        //Neu ko tra ve null
        return result.isPresent() ? result.get() : null;

    }
}
