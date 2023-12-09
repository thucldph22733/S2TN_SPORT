package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.AddressRequestDto;
import com.poly.springboot.entity.Address;
import com.poly.springboot.entity.User;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.AddressRepository;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;


@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;
    @Override
    public List<Address> getAddressesByUserId(Long userId) {
        return addressRepository.findAddressesByUserId(userId);
    }

    @Override
    public Boolean createAddress(AddressRequestDto addressRequestDto) {
        User user = userRepository.findById(addressRequestDto.getUsersId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id người dùng này!", String.valueOf(id)));

        Address address = new Address();
        mapAddressRequestDtoToEntity(addressRequestDto, address, user);
        addressRepository.save(address);
        return true;
    }

    @Override
    public Boolean updateAddress(Long id, AddressRequestDto addressRequestDto) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id địa chỉ này", String.valueOf(id)));

        mapAddressRequestDtoToEntity(addressRequestDto, address, null);  // Null vì không cần cập nhật user trong trường hợp này
        addressRepository.save(address);
        return true;
    }
    private void mapAddressRequestDtoToEntity(AddressRequestDto addressRequestDto, Address address, User user) {
        address.setRecipientName(addressRequestDto.getRecipientName());
        address.setPhoneNumber(addressRequestDto.getPhoneNumber());
        address.setDistrict(addressRequestDto.getDistrict());
        address.setCity(addressRequestDto.getCity());
        address.setAddressDetail(addressRequestDto.getAddressDetail());
        address.setWard(addressRequestDto.getWard());
        address.setDeleted(addressRequestDto.getDeleted());

        if (user != null) {
            address.setUsers(List.of(user));
        }
    }

    @Override
    public Boolean deleteAddress(Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id địa chỉ này", String.valueOf(id)));

        // Xóa liên kết nhiều-đến-nhiều trong bảng trung gian
        address.getUsers().clear();
        addressRepository.save(address);

        // Xóa địa chỉ
        addressRepository.delete(address);

        return true;
    }
}
