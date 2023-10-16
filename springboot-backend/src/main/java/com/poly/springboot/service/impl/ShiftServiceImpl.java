package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.ShiftRequestDto;
import com.poly.springboot.dto.responseDto.ShiftResponseDto;
import com.poly.springboot.entity.Shifts;
import com.poly.springboot.repository.ShiftRepository;
import com.poly.springboot.repository.StaffRepository;
import com.poly.springboot.service.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShiftServiceImpl implements ShiftService {
    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public List<ShiftResponseDto> getShifts() {
        return shiftRepository.findAll().stream().map(
                shifts -> new ShiftResponseDto(
                        shifts.getId(),
                        shifts.getStaff().getStaffName(),
                        shifts.getStartTime(),
                        shifts.getEndTime(),
                        shifts.getInitialAmount(),
                        shifts.getTotalRevenue(),
                        shifts.getCash(),
                        shifts.getTransferMoney(),
                        shifts.getTotalAvailableMoney(),
                        shifts.getMoneyArises(),
                        shifts.getCollectedOwner(),
                        shifts.getNote())
        ).collect(Collectors.toList());
    }

    @Override
    public Shifts getShift(Long id) {
        Optional<Shifts> result = shiftRepository.findById(id);

        return result.isPresent() ? result.get() : null;
    }

    @Override
    public Shifts createShift(ShiftRequestDto shiftRequestDto) {
        Shifts shifts = new Shifts();

        shifts.setStaff(staffRepository.findById(shiftRequestDto.getStaffId()).orElse(null));
        shifts.setInitialAmount(shiftRequestDto.getInitialAmount());
        shifts.setTotalRevenue(shiftRequestDto.getTotalRevenue());
        shifts.setCash(shiftRequestDto.getCash());
        shifts.setTransferMoney(shiftRequestDto.getTransferMoney());
        shifts.setTotalAvailableMoney(shiftRequestDto.getTotalAvailableMoney());
        shifts.setMoneyArises(shiftRequestDto.getMoneyArises());
        shifts.setCollectedOwner(shiftRequestDto.getCollectedOwner());
        shifts.setNote(shiftRequestDto.getNote());

        shiftRepository.save(shifts);

        return shifts;
    }

    @Override
    public Shifts updateShift(ShiftRequestDto shiftRequestDto, Long id) {
        Shifts shifts = shiftRepository.findById(id).get();

        shifts.setStaff(staffRepository.findById(shiftRequestDto.getStaffId()).orElse(null));
        shifts.setInitialAmount(shiftRequestDto.getInitialAmount());
        shifts.setTotalRevenue(shiftRequestDto.getTotalRevenue());
        shifts.setCash(shiftRequestDto.getCash());
        shifts.setTransferMoney(shiftRequestDto.getTransferMoney());
        shifts.setTotalAvailableMoney(shiftRequestDto.getTotalAvailableMoney());
        shifts.setMoneyArises(shiftRequestDto.getMoneyArises());
        shifts.setCollectedOwner(shiftRequestDto.getCollectedOwner());
        shifts.setNote(shiftRequestDto.getNote());

        shiftRepository.save(shifts);

        return shifts;
    }

    @Override
    public String deleteShift(Long id) {
        if(shiftRepository.existsById(id)){
            shiftRepository.deleteById(id);
            return "Xóa Thành Công";
        }else {
            return "Không Tìm Thấy Id: "+id;
        }
    }
}
