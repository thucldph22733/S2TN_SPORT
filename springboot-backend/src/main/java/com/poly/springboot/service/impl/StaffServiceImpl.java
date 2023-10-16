package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.StaffRequestDto;
import com.poly.springboot.dto.responseDto.StaffResponseDto;
import com.poly.springboot.entity.Staff;
import com.poly.springboot.repository.RoleRepository;
import com.poly.springboot.repository.StaffRepository;
import com.poly.springboot.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<StaffResponseDto> getStaffs() {
        return staffRepository.findAll().stream().map(
                staff -> new StaffResponseDto(
                        staff.getId(),
                        staff.getRole().getRoleName(),
                        staff.getStaffName(),
                        staff.getAvatar(),
                        staff.getNumberPhone(),
                        staff.getEmail(),
                        staff.getGender(),
                        staff.getBirthOfDay(),
                        staff.getAddress(),
                        staff.getCity(),
                        staff.getCountry(),
                        staff.getStaffStatus())
        ).collect(Collectors.toList());
    }

    @Override
    public Staff saveStaff(StaffRequestDto requestDto) {
        Staff staff = new Staff();

        staff.setRole(roleRepository.findById(requestDto.getRoleId()).orElse(null));
        staff.setStaffName(requestDto.getStaffName());
        staff.setAvatar(requestDto.getAvatar());
        staff.setNumberPhone(requestDto.getNumberPhone());
        staff.setEmail(requestDto.getEmail());
        staff.setGender(requestDto.getGender());
        staff.setBirthOfDay(requestDto.getBirthOfDate());
        staff.setAddress(requestDto.getAddress());
        staff.setCity(requestDto.getCity());
        staff.setCountry(requestDto.getCountry());
        staff.setPassword(requestDto.getPassword());
        staff.setStaffStatus(requestDto.getStaffStatus());
        staffRepository.save(staff);

        return staff;
    }

    @Override
    public Staff updateStaff(StaffRequestDto requestDto, Long id) {

        Staff staff = staffRepository.findById(id).get();

        staff.setRole(roleRepository.findById(requestDto.getRoleId()).orElse(null));
        staff.setStaffName(requestDto.getStaffName());
        staff.setAvatar(requestDto.getAvatar());
        staff.setNumberPhone(requestDto.getNumberPhone());
        staff.setEmail(requestDto.getEmail());
        staff.setGender(requestDto.getGender());
        staff.setBirthOfDay(requestDto.getBirthOfDate());
        staff.setAddress(requestDto.getAddress());
        staff.setCity(requestDto.getCity());
        staff.setCountry(requestDto.getCountry());
        staff.setPassword(requestDto.getPassword());
        staff.setStaffStatus(requestDto.getStaffStatus());
        staffRepository.save(staff);

        return staff;
    }

    @Override
    public String deleteStaff(Long id) {

        if(staffRepository.existsById(id)){

            staffRepository.deleteById(id);

            return "Xóa Thành Công";
        }else {
            return "Không tìm thấy id: "+id;
        }

    }

    @Override
    public Staff findStaffById(Long id) {

        Optional<Staff> result = staffRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }
}
