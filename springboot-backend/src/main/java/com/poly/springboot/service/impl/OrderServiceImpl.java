package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.SecondOrderResponseDto;
import com.poly.springboot.entity.*;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private OrderStatusRepository orderStatusRepository;
    private AddressRepository addressRepository;
    private DeliveryRepository shippingMethodRepository;
    private PaymentRepository paymentMethodRepository;
    private UserRepository userRepository;
    private VoucherRepository voucherRepository;

    private TimeLineRepository timeLineRepository;


    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderStatusRepository orderStatusRepository,
                            AddressRepository addressRepository,
                            DeliveryRepository shippingMethodRepository,
                            PaymentRepository paymentMethodRepository,
                            UserRepository userRepository,
                            VoucherRepository voucherRepository,
                            TimeLineRepository timeLineRepository) {
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.addressRepository = addressRepository;
        this.shippingMethodRepository = shippingMethodRepository;
        this.userRepository = userRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.voucherRepository = voucherRepository;
        this.timeLineRepository = timeLineRepository;
    }


    @Override
    public List<OrderResponseDto> getAllOrdersCompleted() {
        return orderRepository.findAllByStatusId().stream().map(
                order -> new OrderResponseDto(
                        order.getId(),
                        order.getVoucher() != null ? order.getVoucher().getId() : null,
                        order.getUser() != null ? order.getUser().getId() : null,
                        order.getUser() != null ? order.getUser().getUsersName() : "",  // Thay thế từ getCustomer() sang getUser()
                        order.getUser() != null ? order.getUser().getPhoneNumber() : "",  // Thay thế từ getCustomer() sang getUser()
                        order.getPayment() != null ? order.getPayment().getPaymentName() : "",
                        order.getAddressDetail(),
                        order.getWard(),
                        order.getDistrict(),
                        order.getCity(),
                        order.getVoucher() != null ? order.getVoucher().getVoucherName() : "",
                        order.getOrderStatus() != null ? order.getOrderStatus().getStatusName() : "",
                        order.getNote(),
                        order.getOrderTotal(),
                        order.getOrderTotalInitial(),
                        order.getDiscountMoney()

                )
        ).collect(Collectors.toList());
    }

    @Override
    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream().map(
                order -> new OrderResponseDto(
                        order.getId(),
                        order.getVoucher() != null ? order.getVoucher().getId() : null,
                        order.getUser() != null ? order.getUser().getId() : null,
                        order.getUser() != null ? order.getUser().getUsersName() : "",  // Thay thế từ getCustomer() sang getUser()
                        order.getUser() != null ? order.getUser().getPhoneNumber() : "",  // Thay thế từ getCustomer() sang getUser()
                        order.getPayment() != null ? order.getPayment().getPaymentName() : "",
                        order.getAddressDetail(),
                        order.getWard(),
                        order.getDistrict(),
                        order.getCity(),
                        order.getVoucher() != null ? order.getVoucher().getVoucherName() : "",
                        order.getOrderStatus() != null ? order.getOrderStatus().getStatusName() : "",
                        order.getNote(),
                        order.getOrderTotal(),
                        order.getOrderTotalInitial(),
                        order.getDiscountMoney()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public Order findOrderById(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn", String.valueOf(id)));

        return order;
    }

    @Override
    public User findUserByOrderId(Long orderId) {
        User user = orderRepository.findUserByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn", String.valueOf(orderId)));
        return user;
    }

    @Override
    public Voucher findVoucherByOrderId(Long orderId) {
        Voucher voucher = orderRepository.findVoucherByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn", String.valueOf(orderId)));
        return voucher;
    }


    @Override
    public Boolean createOrder(OrderRequestDto orderRequestDto) {

        Long userId = orderRequestDto.getUserId();
        Long paymentId = orderRequestDto.getPaymentId();
        Long deliveryId = orderRequestDto.getDeliveryId();

// Kiểm tra và tìm đối tượng Customer
        User user = userId != null ? userRepository.findById(userId).orElse(null) : null;

// Kiểm tra và tìm đối tượng Payment
        Payment payment = paymentId != null ? paymentMethodRepository.findById(paymentId).orElse(null) : null;

// Kiểm tra và tìm đối tượng Delivery
        Delivery delivery = deliveryId != null ? shippingMethodRepository.findById(deliveryId).orElse(null) : null;

// Tìm đối tượng OrderStatus (set luôn là null nếu không tìm thấy)
        OrderStatus orderStatus = orderStatusRepository.findById(1L).orElse(null);

// Kiểm tra và tạo đối tượng Address
        Address newAddress = new Address();
        newAddress.setRecipientName(orderRequestDto.getRecipientName());
        newAddress.setPhoneNumber(orderRequestDto.getPhoneNumber());
        newAddress.setAddressDetail(orderRequestDto.getAddressDetail());
        newAddress.setWard(orderRequestDto.getRegion());
        newAddress.setDistrict(orderRequestDto.getDistrict());
        newAddress.setCity(orderRequestDto.getCity());

        Address address = addressRepository.save(newAddress);

// Tạo đối tượng Order và set các giá trị đã tìm được
        Order order = new Order();
        order.setUser(user);
        order.setDelivery(delivery);
        order.setPayment(payment);  
        order.setOrderStatus(orderStatus);
        order.setOrderTotal(orderRequestDto.getOrderTotal());
        order.setNote(orderRequestDto.getNote());

// Lưu vào cơ sở dữ liệu
        orderRepository.save(order);

        TimeLine timeLine = new TimeLine();
        timeLine.setOrder(order);
        timeLine.setStatus(1);
        timeLineRepository.save(timeLine);

        return true;
    }

    @Override
    public Boolean updateOrder(OrderRequestDto orderRequestDto, Long id) {
        try {
            // Lấy thông tin các đối tượng liên quan từ ID
            User user = orderRequestDto.getUserId() != null ? userRepository.findById(orderRequestDto.getUserId()).orElse(null) : null;
            Payment payment = orderRequestDto.getPaymentId() != null ? paymentMethodRepository.findById(orderRequestDto.getPaymentId()).orElse(null) : null;
            Delivery delivery = orderRequestDto.getDeliveryId() != null ? shippingMethodRepository.findById(orderRequestDto.getDeliveryId()).orElse(null) : null;
            OrderStatus orderStatus = orderRequestDto.getStatusId() != null ? orderStatusRepository.findById(orderRequestDto.getStatusId()).orElse(null) : null;
            Address address = orderRequestDto.getAddressId() != null ? addressRepository.findById(orderRequestDto.getAddressId()).orElse(null) : null;
            Voucher voucher = orderRequestDto.getVoucherId() != null ? voucherRepository.findById(orderRequestDto.getVoucherId()).orElse(null) : null;

            // Lấy thông tin đơn hàng từ ID
            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> {
                        System.out.println("Order not found with id: " + id);
                        return new ResourceNotFoundException("Hóa đơn", String.valueOf(id));
                    });

            // Cập nhật thông tin đơn hàng
            order.setUser(user);
            order.setDelivery(delivery);
            order.setPayment(payment);
            order.setOrderStatus(orderStatus);
            order.setVoucher(voucher);
            order.setOrderTotal(orderRequestDto.getOrderTotal());
            order.setNote(orderRequestDto.getNote());
            order.setOrderTotalInitial(order.getOrderTotalInitial());

            // Tính toán giảm giá và cập nhật
            if (voucher != null) {
                double discountRate = voucher.getDiscountRate();
                double giamGia = (orderRequestDto.getOrderTotalInitial() * discountRate) / 100;
                order.setDiscountMoney(giamGia);
                order.setOrderTotal(orderRequestDto.getOrderTotalInitial() - giamGia);
            }

            // Lưu đơn hàng và trả về true
            orderRepository.save(order);
            return true;
        } catch (Exception e) {
            // Xử lý ngoại lệ và log lỗi nếu cần
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateOrders(OrderRequestDto orderRequestDto, Long id) {
        try {
            // Lấy thông tin các đối tượng liên quan từ ID
            User user = orderRequestDto.getUserId() != null ? userRepository.findById(orderRequestDto.getUserId()).orElse(null) : null;
            Payment payment = orderRequestDto.getPaymentId() != null ? paymentMethodRepository.findById(orderRequestDto.getPaymentId()).orElse(null) : null;
            Delivery delivery = orderRequestDto.getDeliveryId() != null ? shippingMethodRepository.findById(orderRequestDto.getDeliveryId()).orElse(null) : null;
            OrderStatus orderStatus = orderRequestDto.getStatusId() != null ? orderStatusRepository.findById(orderRequestDto.getStatusId()).orElse(null) : null;
            Address address = orderRequestDto.getAddressId() != null ? addressRepository.findById(orderRequestDto.getAddressId()).orElse(null) : null;
            Voucher voucher = orderRequestDto.getVoucherId() != null ? voucherRepository.findById(orderRequestDto.getVoucherId()).orElse(null) : null;

            // Lấy thông tin đơn hàng từ ID
            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> {
                        System.out.println("Order not found with id: " + id);
                        return new ResourceNotFoundException("Hóa đơn", String.valueOf(id));
                    });

            // Cập nhật thông tin đơn hàng
            order.setUser(user);
            order.setDelivery(delivery);
            order.setPayment(payment);
            order.setOrderStatus(orderStatus);
            order.setVoucher(voucher);
            order.setOrderTotal(orderRequestDto.getOrderTotal());
            order.setNote(orderRequestDto.getNote());
            order.setOrderTotalInitial(order.getOrderTotalInitial());

            // Tính toán giảm giá và cập nhật
            if (voucher != null) {
                double discountRate = voucher.getDiscountRate();
                double giamGia = (orderRequestDto.getOrderTotalInitial() * discountRate) / 100;
                order.setDiscountMoney(giamGia);
                order.setOrderTotal(orderRequestDto.getOrderTotalInitial() - giamGia);
            }

            // Kiểm tra xem có TimeLine nào đã được tạo mới cho đơn hàng với trạng thái là 2 không
            TimeLine existingTimeLine = timeLineRepository.findByOrderAndStatus(order, 2);

            if (existingTimeLine == null) {
                // Nếu không có, hãy tạo mới TimeLine
                TimeLine timeLine = new TimeLine();
                timeLine.setOrder(order);
                timeLine.setStatus(2);
                timeLine.setNote("Đã thanh toán");
                timeLineRepository.save(timeLine);
            } else {
                // TimeLine đã tồn tại
            }

            // Lưu đơn hàng và trả về true
            orderRepository.save(order);
            return true;
        } catch (Exception e) {
            // Xử lý ngoại lệ và log lỗi nếu cần
            e.printStackTrace();
            return false;
        }
    }





    @Override
    public List<SecondOrderResponseDto> getAllOrde() {
        return orderRepository.findAllOrdersWithDetails().stream().map(
                order -> new SecondOrderResponseDto(
                        order.getId(),
                        order.getOrderStatus() != null ? order.getOrderStatus().getStatusName() : "",
                        order.getOrderTotal()
                )
        ).collect(Collectors.toList());
    }


//    @Override
//    public List<OrderResponseDto> searchOrder(Integer pageNo, String keyword) {
//        return null;
//    }


    @Override
    public List<OrderResponseDto> getPagination(Integer pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10);
        return orderRepository.findAll(pageable).stream().map(
                order -> new OrderResponseDto(
                        order.getId(),
                        order.getVoucher().getId(),
                        order.getUser().getId(),
                        order.getUser().getUsersName(),
                        order.getUser().getPhoneNumber(),
                        order.getPayment().getPaymentName(),
                        order.getAddressDetail(),
                        order.getWard(),
                        order.getDistrict(),
                        order.getCity(),
                        order.getVoucher().getVoucherName(),
                        order.getOrderStatus().getStatusName(),
                        order.getNote(),
                        order.getOrderTotal(),
                        order.getOrderTotalInitial(),
                        order.getDiscountMoney()
                )
        ).collect(Collectors.toList());
    }
}
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
