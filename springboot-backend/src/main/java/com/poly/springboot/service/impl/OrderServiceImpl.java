package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderResponseDto;
import com.poly.springboot.dto.responseDto.SecondOrderResponseDto;
import com.poly.springboot.entity.*;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private OrderStatusRepository orderStatusRepository;
    private OrderTypeRepository orderTypeRepository;
    private DeliveryRepository shippingMethodRepository;
    private PaymentRepository paymentMethodRepository;
    private UserRepository userRepository;
    private VoucherRepository voucherRepository;

    private TimeLineRepository timeLineRepository;


    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderStatusRepository orderStatusRepository,
                            OrderTypeRepository orderTypeRepository,
                            DeliveryRepository shippingMethodRepository,
                            PaymentRepository paymentMethodRepository,
                            UserRepository userRepository,
                            VoucherRepository voucherRepository,
                            TimeLineRepository timeLineRepository) {
        this.orderRepository = orderRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.orderTypeRepository = orderTypeRepository;
        this.shippingMethodRepository = shippingMethodRepository;
        this.userRepository = userRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.voucherRepository = voucherRepository;
        this.timeLineRepository = timeLineRepository;
    }


//    @Override
//    public List<OrderResponseDto> getAllOrdersCompleted() {
//        return orderRepository.findAllByStatusId().stream().map(
//                order -> new OrderResponseDto(
//                        order.getId(),
//                        order.getVoucher() != null ? order.getVoucher().getId() : null,
//                        order.getUser() != null ? order.getUser().getId() : null,
//                        order.getUser() != null ? order.getUser().getUsersName() : "",  // Thay thế từ getCustomer() sang getUser()
//                        order.getUser() != null ? order.getUser().getPhoneNumber() : "",  // Thay thế từ getCustomer() sang getUser()
//                        order.getPayment() != null ? order.getPayment().getPaymentName() : "",
//                        order.getAddressDetail(),
//                        order.getWard(),
//                        order.getDistrict(),
//                        order.getCity(),
//                        order.getVoucher() != null ? order.getVoucher().getVoucherName() : "",
//                        order.getOrderStatus() != null ? order.getOrderStatus().getStatusName() : "",
//                        order.getNote(),
//                        order.getOrderTotal(),
//                        order.getOrderTotalInitial()
//                )
//        ).collect(Collectors.toList());
//    }

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
                        order.getOrderTotalInitial()
                )
        ).collect(Collectors.toList());
    }

    @Override
    public Order findOrderById(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này"));

        return order;
    }

    @Override
    public User findUserByOrderId(Long orderId) {
        User user = orderRepository.findUserByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này"));
        return user;
    }

    @Override
    public Voucher findVoucherByOrderId(Long orderId) {
        Voucher voucher = orderRepository.findVoucherByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này"));
        return voucher;
    }




    //    @Override
//    public Order findOrderById(Long id) {
//
//        Order order = orderRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này"));
//
//        return order;
//    }
//
//    @Override
//    public User findUserByOrderId(Long orderId) {
//        User user = orderRepository.findUserByOrderId(orderId)
//                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này"));
//        return user;
//    }
//
//    @Override
//    public Voucher findVoucherByOrderId(Long orderId) {
//        Voucher voucher = orderRepository.findVoucherByOrderId(orderId)
//                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này"));
//        return voucher;
//    }
//
//
    @Override
    public Page<Order> getAllOrders(Long orderStatusId, Pageable pageable) {
        Page<Order> orderPage;
        if (orderStatusId == null){
            orderPage = orderRepository.findAllByDeletedIsTrue(pageable);
        }else {
            orderPage = orderRepository.findAllByOrderStatusIdAndDeletedIsTrue(orderStatusId,pageable);
        }
        return orderPage;
    }

    @Override
    public Page<Order> findAllOrderByStatusId(Pageable pageable) {
        return orderRepository.findAllOrderByStatusId(pageable);
    }

    @Override
    public Boolean createOrder(OrderRequestDto orderRequestDto) {

        Long userId = orderRequestDto.getUserId();
        Long paymentId = orderRequestDto.getPaymentId();
        Long deliveryId = orderRequestDto.getDeliveryId();
        Long voucherId = orderRequestDto.getVoucherId();
        Long orderTypeId = orderRequestDto.getOrderTypeId();
// Kiểm tra và tìm đối tượng Customer
        User user = userId != null ? userRepository.findById(userId).orElse(null) : null;

// Kiểm tra và tìm đối tượng Payment
        Payment payment = paymentId != null ? paymentMethodRepository.findById(paymentId).orElse(null) : null;

// Kiểm tra và tìm đối tượng Delivery
        Delivery delivery = deliveryId != null ? shippingMethodRepository.findById(deliveryId).orElse(null) : null;

// Kiểm tra và tìm đối tượng voucher
        Voucher voucher = voucherId != null ? voucherRepository.findById(voucherId).orElse(null) : null;

// Tìm đối tượng OrderStatus (set luôn là null nếu không tìm thấy)
        OrderStatus orderStatus = orderStatusRepository.findById(1L).orElse(null);

        OrderType orderType = orderTypeId != null ? orderTypeRepository.findById(orderTypeId).orElse(null) : null;

// Tạo đối tượng Order và set các giá trị đã tìm được
        Order order = new Order();
        order.setUser(user);
        order.setDelivery(delivery);
        order.setPayment(payment);
        order.setOrderStatus(orderStatus);
        order.setOrderType(orderType);
        order.setVoucher(voucher);
        order.setOrderTotal(orderRequestDto.getOrderTotal());
        order.setNote(orderRequestDto.getNote());
        order.setDeleted(true);
        //dịa chỉ giao
        order.setRecipientName(orderRequestDto.getRecipientName());
        order.setPhoneNumber(orderRequestDto.getPhoneNumber());
        order.setAddressDetail(orderRequestDto.getAddressDetail());
        order.setWard(orderRequestDto.getWard());
        order.setDistrict(orderRequestDto.getDistrict());
        order.setCity(orderRequestDto.getCity());

// Lưu vào cơ sở dữ liệu
        orderRepository.save(order);

        TimeLine timeLine = new TimeLine();
        timeLine.setOrder(order);
        timeLine.setStatus(1);
        timeLine.setDeleted(true);
        timeLineRepository.save(timeLine);

        return true;
    }
    @Override
    public Boolean deleteOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));

        order.setDeleted(false);

        orderRepository.save(order);
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
            Voucher voucher = orderRequestDto.getVoucherId() != null ? voucherRepository.findById(orderRequestDto.getVoucherId()).orElse(null) : null;

            // Lấy thông tin đơn hàng từ ID
            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> {
                        System.out.println("Order not found with id: " + id);
                        return new ResourceNotFoundException("Không tìm thấy id hóa đơn này");
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
            OrderType orderType = orderRequestDto.getOrderTypeId() != null ? orderTypeRepository.findById(orderRequestDto.getOrderTypeId()).orElse(null) : null;
            Voucher voucher = orderRequestDto.getVoucherId() != null ? voucherRepository.findById(orderRequestDto.getVoucherId()).orElse(null) : null;

            // Lấy thông tin đơn hàng từ ID
            Order order = orderRepository.findById(id)
                    .orElseThrow(() -> {
                        System.out.println("Order not found with id: " + id);
                        return new ResourceNotFoundException("Không tìm thấy id hóa đơn này");
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
            order.setOrderType(orderType);

            // Tính toán giảm giá và cập nhật
            if (voucher != null) {
                double discountRate = voucher.getDiscountRate();
                double giamGia = (orderRequestDto.getOrderTotalInitial() * discountRate) / 100;
                order.setOrderTotal(orderRequestDto.getOrderTotalInitial() - giamGia);
            }

            // Kiểm tra xem có TimeLine nào đã được tạo mới cho đơn hàng với trạng thái là 2 không
            TimeLine existingTimeLine = timeLineRepository.findByOrderAndStatusAndDeletedTrue(order, 2);

            if (existingTimeLine == null) {
                // Nếu không có, hãy tạo mới TimeLine

                TimeLine timeLine = new TimeLine();
                timeLine.setOrder(order);
                timeLine.setStatus(2);
                timeLine.setDeleted(true);
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
                        order.getOrderTotalInitial()
                )
        ).collect(Collectors.toList());
    }
}
