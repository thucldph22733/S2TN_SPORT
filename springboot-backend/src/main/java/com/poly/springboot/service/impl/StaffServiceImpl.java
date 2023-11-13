package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;
import com.poly.springboot.entity.Staff;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.mapper.StaffMapper;
import com.poly.springboot.repository.StaffRepository;
import com.poly.springboot.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.stream.Collectors;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    private PasswordEncoder passwordEncoder;



//    @Override
//    public List<StaffResponseDto> getStaffs() {
//        return staffRepository.findAll().stream().map(
//                staff -> StaffMapper.mapToStaffResponse(staff, new StaffResponseDto())
//        ).collect(Collectors.toList());
//    }

    @Override
    public List<StaffResponseDto> getPagination(Integer pageNo) {

        Pageable pageable = PageRequest.of(pageNo, 10);

        return staffRepository.findAll(pageable).stream().map(
                StaffMapper::mapToStaffResponse
        ).collect(Collectors.toList());
    }

    @Override
    public List<StaffResponseDto> searchStaff(String keyword, Integer pageNo) {

        Pageable pageable = PageRequest.of(pageNo, 10);

        return staffRepository.searchStaff(keyword, pageable).stream().map(
                StaffMapper::mapToStaffResponse
        ).collect(Collectors.toList());
    }

//    @Override
//    public Boolean createStaff(StaffRequestDto staffRequestDto) {
//
//        Boolean isPhoneNumber = staffRepository.existsByPhoneNumber(staffRequestDto.getPhoneNumber());
//        if (isPhoneNumber) {
//            throw new AlreadyExistsException("Số điện thoại này đã tồn tại !");
//        }
//        Boolean isEmail = staffRepository.existsByEmail(staffRequestDto.getEmail());
//        if (isEmail) {
//            throw new AlreadyExistsException("Địa chỉ email này đã tồn tại !");
//        }
//
//        Staff staff = Staff.builder()
//                .staffName(staffRequestDto.getStaffName())
//                .avatar(staffRequestDto.getAvatar())
//                .phoneNumber(staffRequestDto.getPhoneNumber())
//                .email(staffRequestDto.getEmail())
//                .gender(staffRequestDto.getGender())
//                .birthOfDay(staffRequestDto.getBirthOfDay())
//                .address(staffRequestDto.getAddress())
//                .password(passwordEncoder.encode(staffRequestDto.getPassword()))
//                .status(0)
//                .build();
//        var savedUser = repository.save(user);
//        var jwtToken = jwtService.generateToken(user);
//        var refreshToken = jwtService.generateRefreshToken(user);
//        staffRepository.save(staff);
//        return true;
//    }

    @Override
    public Boolean updateStaff(StaffRequestDto staffRequestDto, Long id) {

        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("nhân viên", String.valueOf(id)));

        StaffMapper.mapToStaffRequest(staff, staffRequestDto);

        staffRepository.save(staff);

        return true;
    }

    @Override
    public Boolean deleteStaff(Long id) {

        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("nhân viên", String.valueOf(id)));

        staff.setStatus( staff.getStatus() ?false:true);
        staffRepository.save(staff);

        return true;

    }


}
