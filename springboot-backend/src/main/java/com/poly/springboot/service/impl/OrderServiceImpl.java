//package com.poly.springboot.service.impl;
//
//import com.poly.springboot.dto.requestDto.OrderRequestDto;
//import com.poly.springboot.dto.responseDto.OrderResponseDto;
//import com.poly.springboot.entity.*;
//import com.poly.springboot.exception.ResourceNotFoundException;
//import com.poly.springboot.repository.*;
//import com.poly.springboot.service.OrderService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//
//import java.util.Date;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class OrderServiceImpl implements OrderService {
//
//    private OrderRepository orderRepository;
//    private OrderStatusRepository orderStatusRepository;
//    private AddressRepository addressRepository;
//    private DeliveryRepository shippingMethodRepository;
//    private PaymentRepository paymentMethodRepository;
//    private CustomerRepository customerRepository;
//    private UserRepository staffRepository;
//
//
//    @Autowired
//    public OrderServiceImpl(OrderRepository orderRepository,
//                            OrderStatusRepository orderStatusRepository,
//                            AddressRepository addressRepository,
//                            DeliveryRepository shippingMethodRepository,
//                            PaymentRepository paymentMethodRepository,
//                            CustomerRepository customerRepository,
//                            UserRepository staffRepository) {
//        this.orderRepository = orderRepository;
//        this.orderStatusRepository = orderStatusRepository;
//        this.addressRepository= addressRepository;
//        this.shippingMethodRepository = shippingMethodRepository;
//        this.paymentMethodRepository = paymentMethodRepository;
//        this.customerRepository = customerRepository;
//        this.staffRepository = staffRepository;
//    }
//
//
//    @Override
//    public List<OrderResponseDto> getOrders() {
//        return orderRepository.findAll().stream().map(
//                order -> new OrderResponseDto(
//                        order.getId(),
//                        order.getOrderDate(),
//                        order.getStaff().getStaffName(),
//                        order.getCustomer().getCustomerName(),
//                        order.getDelivery().getDeliveryName(),
//                        order.getPayment().getPaymentName(),
//                        order.getAddress().getAddressDetail(),
//                        order.getOrderStatus().getStatusName(),
//                        order.getDeliveryDate(),
//                        order.getReceivedDate(),
//                        order.getCategoryOrder(),
//                        order.getNote()
//                )
//        ).collect(Collectors.toList());
//    }
//
//    @Override
//    public Order findOrderById(Long id) {
//
//        Order order = orderRepository.findById(id)
//                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));
//
//        return order;
//    }
//
//
//    @Override
//    public Boolean createOrder(OrderRequestDto orderRequestDto) {
//
//        //Get customer by id
//        Customer customer = customerRepository.findById(orderRequestDto.getCustomerId()).orElse(null);
//        //Get staff by id
//        User staff = staffRepository.findById(orderRequestDto.getStaffId()).orElse(null);
//        //Get paymentMethod by id
//        Payment payment= paymentMethodRepository.findById(orderRequestDto.getPaymentId()).orElse(null);
//        //Get shippingMethod by id
//        Delivery delivery =  shippingMethodRepository.findById(orderRequestDto.getDeliveryId()).orElse(null);
//        //Get orderStatus by id
//        OrderStatus orderStatus = orderStatusRepository.findById(Long.valueOf(1000)).orElse(null);
//        //Get address by id
//
//        Order order = new Order();
//
//        order.setCustomer(customer);
//        order.setStaff(staff);
//        order.setDelivery(delivery);
//        order.setPayment(payment);
//        order.setOrderStatus(orderStatus);
//
//        Address newAddress = new Address();
//        newAddress.setRecipientName(orderRequestDto.getRecipientName());
//        newAddress.setPhoneNumber(orderRequestDto.getPhoneNumber());
//        newAddress.setAddressDetail(orderRequestDto.getAddressDetail());
//        newAddress.setRegion(orderRequestDto.getRegion());
//        newAddress.setDistrict(orderRequestDto.getDistrict());
//        newAddress.setCity(orderRequestDto.getCity());
//
//        Address address = addressRepository.save(newAddress);
//        order.setAddress(address);
//        order.setCategoryOrder(orderRequestDto.getCategoryOrder());
//        order.setOrderTotal(orderRequestDto.getOrderTotal());
//        order.setNote(orderRequestDto.getNote());
//        orderRepository.save(order);
//        return true;
//    }
//
//    @Override
//    public Boolean updateOrder(OrderRequestDto orderRequestDto, Long id) {
//
//        //Get customer by id
//        Customer customer = customerRepository.findById(orderRequestDto.getCustomerId()).orElse(null);
//        //Get staff by id
//        User staff = staffRepository.findById(orderRequestDto.getStaffId()).orElse(null);
//        //Get paymentMethod by id
//        Payment payment = paymentMethodRepository.findById(orderRequestDto.getPaymentId()).orElse(null);
//        //Get shippingMethod by id
//        Delivery delivery =  shippingMethodRepository.findById(orderRequestDto. getDeliveryId()).orElse(null);
//        //Get orderStatus by id
//        OrderStatus orderStatus = orderStatusRepository.findById(orderRequestDto.getStatusId()).orElse(null);
//        //Get address by id
//        Address address = addressRepository.findById(orderRequestDto.getAddressId()).orElse(null);
//
//        Order order = orderRepository.findById(id)
//                .orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));  //Find order by id
//
//        //Neu tim thay update lai
//        order.setCustomer(customer);
//        order.setStaff(staff);
//        order.setDelivery(delivery);
//        order.setPayment(payment);
//        order.setOrderStatus(orderStatus);
//        order.setAddress(address);
//        order.setCategoryOrder(orderRequestDto.getCategoryOrder());
//        order.setOrderTotal(orderRequestDto.getOrderTotal());
//        order.setNote(orderRequestDto.getNote());
//
//        //Kiem tra trang thai
//        //Neu trang thai co tên = dang giao thi cap nhat ngay giao
//        if(orderStatus.getStatusName() == "Đang giao"){
//            order.setDeliveryDate(new Date());
//        }else  if(orderStatus.getStatusName() == "Đã nhận"){  //Neu trang thai co ten la da nhan thi cap nhat ngay nhan
//            order.setReceivedDate(new Date());
//        }
//        orderRepository.save(order);
//        return true;
//    }
//
////    @Override
////    public List<OrderResponseDto> searchOrder(Integer pageNo, String keyword) {
////        return null;
////    }
//
//
//    @Override
//    public List<OrderResponseDto> getPagination(Integer pageNo) {
//        Pageable pageable = PageRequest.of(pageNo,10);
//        return orderRepository.findAll(pageable).stream().map(
//            order -> new OrderResponseDto(
//                    order.getId(),
//                    order.getOrderDate(),
//                    order.getStaff().getStaffName(),
//                    order.getCustomer().getCustomerName(),
//                    order.getDelivery().getDeliveryName(),
//                    order.getPayment().getPaymentName(),
//                    order.getAddress().getAddressDetail(),
//                    order.getOrderStatus().getStatusName(),
//                    order.getDeliveryDate(),
//                    order.getReceivedDate(),
//                    order.getCategoryOrder(),
//                    order.getNote())
//        ).collect(Collectors.toList());
//    }
//}
