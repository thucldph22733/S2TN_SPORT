//package com.poly.springboot.service.impl;
//
//import com.poly.springboot.dto.requestDto.StaffRequestDto;
//import com.poly.springboot.dto.responseDto.StaffResponseDto;
//import com.poly.springboot.entity.Role;
//import com.poly.springboot.entity.Staff;
//import com.poly.springboot.exception.AlreadyExistsException;
//import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.mapper.StaffMapper;
//import com.poly.springboot.repository.RoleRepository;
//import com.poly.springboot.repository.StaffRepository;
//import com.poly.springboot.service.StaffService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//import java.util.stream.Collectors;
//
//@Service
//public class StaffServiceImpl implements StaffService {
//
//    @Autowired
//    private StaffRepository staffRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Override
//    public List<StaffResponseDto> getStaffs() {
//        return staffRepository.findAll().stream().map(
//                staff -> StaffMapper.mapToStaffResponse(staff, new StaffResponseDto())
//        ).collect(Collectors.toList());
//    }
//
//    @Override
//    public List<StaffResponseDto> getPagination(Integer pageNo) {
//        Pageable pageable = PageRequest.of(pageNo, 10);
//        List<StaffResponseDto> list = staffRepository.findAll(pageable).stream().map(
//                staff -> StaffMapper.mapToStaffResponse(staff, new StaffResponseDto())
//        ).collect(Collectors.toList());
//        return list;
//    }
//
//    @Override
//    public List<StaffResponseDto> searchStaff(String keyword, Integer pageNo) {
//        Pageable pageable = PageRequest.of(pageNo, 10);
//        List<StaffResponseDto> list = staffRepository.searchStaff(keyword,pageable).stream().map(
//                staff -> StaffMapper.mapToStaffResponse(staff, new StaffResponseDto())
//        ).collect(Collectors.toList());
//        return list;
//    }
//
//    @Override
//    public Boolean createStaff(StaffRequestDto staffRequestDto) {
//        Staff staff = new Staff();
//
//        StaffMapper.mapToStaffRequest(staff,staffRequestDto);
//
//        Role role = roleRepository.findById(staffRequestDto.getRoleId()).orElse(null);
//        staff.setRole(role);
//        staff.setStatus(0);
//
//        Boolean isPhoneNumber = staffRepository.existsByEmail(staffRequestDto.getPhoneNumber());
//        if (isPhoneNumber){
//            throw new AlreadyExistsException("Số điện thoại này đã tồn tại: "+staffRequestDto.getPhoneNumber());
//        }
//        Boolean isEmail = staffRepository.existsByEmail(staffRequestDto.getEmail());
//        if (isEmail){
//            throw new AlreadyExistsException("Địa chỉ email này đã tồn tại: "+staffRequestDto.getEmail());
//        }
//
//        staffRepository.save(staff);
//        return true;
//    }
//
//    @Override
//    public Boolean updateStaff(StaffRequestDto staffRequestDto, Long id) {
//
//        Boolean isUpdated = false;
//        Staff staff = staffRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Nhân viên",String.valueOf(id)));
//
//        StaffMapper.mapToStaffRequest(staff,staffRequestDto);
//
//        Role role = roleRepository.findById(staffRequestDto.getRoleId()).orElse(null);
//        staff.setRole(role);
//
////        Boolean isEmail = staffRepository.existsByEmail(staffRequestDto.getEmail());
////        if (isEmail && staff.getEmail() != staffRequestDto.getEmail()){
////            throw new AlreadyExistsException("Địa chỉ email này đã tồn tại"+staffRequestDto.getEmail());
////        }
////        Boolean isPhoneNumber = staffRepository.existsByEmail(staffRequestDto.getPhoneNumber());
////        if (isPhoneNumber && staff.getPhoneNumber() != staffRequestDto.getPhoneNumber()){
////            throw new AlreadyExistsException("Số điện thoại này đã tồn tại"+staffRequestDto.getPhoneNumber());
////        }
//
//        staffRepository.save(staff);
//
//        return true;
//    }
//
//    @Override
//    public Boolean deleteStaff(Long id) {
//
//        Staff staff = staffRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Nhân viên",String.valueOf(id)));
//
//        if (staff.getStatus() == 0) {
//            staff.setStatus(1);
//        }else {
//            staff.setStatus(0);
//        }
//        staffRepository.save(staff);
//
//        return true;
//
//    }
//
//
//}
