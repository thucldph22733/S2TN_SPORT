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


@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Address> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }

    @Override
    public Boolean createAddress(AddressRequestDto addressRequestDto) {
        User user = userRepository.findById(addressRequestDto.getUsersId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id người dùng này!"));

        Address address = new Address();
        address.setUser(user);
        if (addressRequestDto.getDeleted() != null && addressRequestDto.getDeleted()) {
            // Nếu deleted là true, cập nhật địa chỉ mặc định và set deleted
            addressRepository.updateDefaultAddress(user.getId());
            address.setDeleted(true);
        }
        mapAddressRequestDtoToEntity(addressRequestDto, address);
        addressRepository.save(address);
        return true;
    }

    @Override
    public Boolean updateAddress(Long id, AddressRequestDto addressRequestDto) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id địa chỉ này"));

        if (addressRequestDto.getDeleted() != null && addressRequestDto.getDeleted()) {
            // Nếu deleted là true, cập nhật địa chỉ mặc định và set deleted
            addressRepository.updateDefaultAddress(address.getUser().getId());
            address.setDeleted(true);
        }

        mapAddressRequestDtoToEntity(addressRequestDto, address);
        addressRepository.save(address);
        return true;
    }

    private void mapAddressRequestDtoToEntity(AddressRequestDto addressRequestDto, Address address) {

        address.setRecipientName(addressRequestDto.getRecipientName());
        address.setPhoneNumber(addressRequestDto.getPhoneNumber());
        address.setDistrict(addressRequestDto.getDistrict());
        address.setCity(addressRequestDto.getCity());
        address.setAddressDetail(addressRequestDto.getAddressDetail());
        address.setWard(addressRequestDto.getWard());

    }

    @Override
    public Boolean deleteAddress(Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id địa chỉ này"));

        // Xóa địa chỉ
        addressRepository.delete(address);

        return true;
    }

    @Override
    public Address findAddressesByUserIdAnDeletedTrue(Long userId) {
        return addressRepository.findAddressesByUserIdAnDeletedTrue(userId);
    }

}

