package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;
import com.poly.springboot.entity.Role;
import com.poly.springboot.entity.Staff;
import com.poly.springboot.exception.AlreadyExistsException;
import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.mapper.StaffMapper;
import com.poly.springboot.mapper.StaffMapper;
import com.poly.springboot.repository.RoleRepository;
import com.poly.springboot.repository.StaffRepository;
import com.poly.springboot.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.stream.Collectors;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private RoleRepository roleRepository;


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

    @Override
    public Boolean createStaff(StaffRequestDto staffRequestDto) {

        Staff staff = new Staff();
        StaffMapper.mapToStaffRequest(staff, staffRequestDto);
        staff.setStatus(0);

        Boolean isPhoneNumber = staffRepository.existsByEmail(staffRequestDto.getPhoneNumber());
        if (isPhoneNumber) {
            throw new AlreadyExistsException("Số điện thoại này đã tồn tại !");
        }
        Boolean isEmail = staffRepository.existsByEmail(staffRequestDto.getEmail());
        if (isEmail) {
            throw new AlreadyExistsException("Địa chỉ email này đã tồn tại !");
        }

        staffRepository.save(staff);
        return true;
    }

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

        staff.setStatus(staff.getStatus() == 0 ? 1 : 0);
        staffRepository.save(staff);

        return true;

    }


}
