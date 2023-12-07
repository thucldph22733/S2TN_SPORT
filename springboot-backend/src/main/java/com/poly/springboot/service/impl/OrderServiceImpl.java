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


import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private OrderStatusRepository orderStatusRepository;
    private AddressRepository addressRepository;
    private DeliveryRepository shippingMethodRepository;
    private PaymentRepository paymentMethodRepository;
    private CustomerRepository customerRepository;
    private StaffRepository staffRepository;

    private VoucherRepository voucherRepository;

    private TimeLineRepository timeLineRepository;


    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderStatusRepository orderStatusRepository,
                            AddressRepository addressRepository,
                            DeliveryRepository shippingMethodRepository,
                            PaymentRepository paymentMethodRepository,
                            CustomerRepository customerRepository,
                            StaffRepository staffRepository,
                            VoucherRepository voucherRepository,
                            TimeLineRepository timeLineRepository) {
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.addressRepository = addressRepository;
        this.shippingMethodRepository = shippingMethodRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.customerRepository = customerRepository;
        this.staffRepository = staffRepository;
        this.voucherRepository = voucherRepository;
        this.timeLineRepository = timeLineRepository;
    }


    @Override
    public List<OrderResponseDto> getAllOrdersCompleted() {
        return orderRepository.findAllByStatusId().stream().map(
                order -> new OrderResponseDto(
                        order.getId(),
                        order.getVoucher() != null ? order.getVoucher().getId() : null,
                        order.getCustomer() != null ? order.getCustomer().getId() : null,
                        order.getOrderDate(),
                        order.getStaff() != null ? order.getStaff().getStaffName() : "",
                        order.getCustomer() != null ? order.getCustomer().getCustomerName() : "",
                        order.getCustomer() != null ? order.getCustomer().getPhoneNumber() : "",
                        order.getDelivery() != null ? order.getDelivery().getDeliveryName() : "",
                        order.getPayment() != null ? order.getPayment().getPaymentName() : "",
                        order.getAddress() != null ? order.getAddress().getAddressDetail() : "",
                        order.getVoucher() != null ? order.getVoucher().getVoucherName() : "",
                        order.getOrderStatus() != null ? order.getOrderStatus().getStatusName() : "",
                        order.getDeliveryDate(),
                        order.getReceivedDate(),
                        order.getCategoryOrder(),
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
                        order.getCustomer() != null ? order.getCustomer().getId() : null,
                        order.getOrderDate(),
                        order.getStaff() != null ? order.getStaff().getStaffName() : "",
                        order.getCustomer() != null ? order.getCustomer().getCustomerName() : "",
                        order.getCustomer() != null ? order.getCustomer().getPhoneNumber() : "",
                        order.getDelivery() != null ? order.getDelivery().getDeliveryName() : "",
                        order.getPayment() != null ? order.getPayment().getPaymentName() : "",
                        order.getAddress() != null ? order.getAddress().getAddressDetail() : "",
                        order.getVoucher() != null ? order.getVoucher().getVoucherName() : "",
                        order.getOrderStatus() != null ? order.getOrderStatus().getStatusName() : "",
                        order.getDeliveryDate(),
                        order.getReceivedDate(),
                        order.getCategoryOrder(),
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
    public Customer findCustomerByOrderId(Long orderId) {
        Customer customer = orderRepository.findCustomerByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn", String.valueOf(orderId)));
        return customer;
    }

    @Override
    public Voucher findVoucherByOrderId(Long orderId) {
        Voucher voucher = orderRepository.findVoucherByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn", String.valueOf(orderId)));
        return voucher;
    }


    @Override
    public Boolean createOrder(OrderRequestDto orderRequestDto) {

        Long customerId = orderRequestDto.getCustomerId();
        Long staffId = orderRequestDto.getStaffId();
        Long paymentId = orderRequestDto.getPaymentId();
        Long deliveryId = orderRequestDto.getDeliveryId();

// Kiểm tra và tìm đối tượng Customer
        Customer customer = customerId != null ? customerRepository.findById(customerId).orElse(null) : null;

// Kiểm tra và tìm đối tượng Staff
        Staff staff = staffId != null ? staffRepository.findById(staffId).orElse(null) : null;

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
        newAddress.setRegion(orderRequestDto.getRegion());
        newAddress.setDistrict(orderRequestDto.getDistrict());
        newAddress.setCity(orderRequestDto.getCity());

        Address address = addressRepository.save(newAddress);

// Tạo đối tượng Order và set các giá trị đã tìm được
        Order order = new Order();
        order.setCustomer(customer);
        order.setStaff(staff);
        order.setDelivery(delivery);
        order.setPayment(payment);  
        order.setOrderStatus(orderStatus);
        order.setAddress(null);
        order.setCategoryOrder(orderRequestDto.getCategoryOrder());
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
            Customer customer = orderRequestDto.getCustomerId() != null ? customerRepository.findById(orderRequestDto.getCustomerId()).orElse(null) : null;
            Staff staff = orderRequestDto.getStaffId() != null ? staffRepository.findById(orderRequestDto.getStaffId()).orElse(null) : null;
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
            order.setCustomer(customer);
            order.setStaff(staff);
            order.setDelivery(delivery);
            order.setPayment(payment);
            order.setOrderStatus(orderStatus);
            order.setAddress(address);
            order.setVoucher(voucher);
            order.setCategoryOrder(orderRequestDto.getCategoryOrder());
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
                        order.getOrderDate(),
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
                        order.getCustomer().getId(),
                        order.getOrderDate(),
                        order.getStaff().getStaffName(),
                        order.getCustomer().getCustomerName(),
                        order.getCustomer().getPhoneNumber(),
                        order.getDelivery().getDeliveryName(),
                        order.getPayment().getPaymentName(),
                        order.getAddress().getAddressDetail(),
                        order.getVoucher().getVoucherName(),
                        order.getOrderStatus().getStatusName(),
                        order.getDeliveryDate(),
                        order.getReceivedDate(),
                        order.getCategoryOrder(),
                        order.getNote(),
                        order.getOrderTotal(),
                        order.getOrderTotalInitial(),
                        order.getDiscountMoney()
                )
        ).collect(Collectors.toList());
    }
}
