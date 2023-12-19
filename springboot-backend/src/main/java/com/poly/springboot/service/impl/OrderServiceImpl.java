package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderCancelRequestDto;
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


import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private OrderStatusRepository orderStatusRepository;
    private DeliveryRepository shippingMethodRepository;
    private PaymentRepository paymentMethodRepository;
    private UserRepository userRepository;
    private VoucherRepository voucherRepository;
    private OrderDetailRepository orderDetailRepository;
    private OrderHistoryRepository orderHistoryRepository;
    private ProductDetailRepository productDetailRepository;



    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderStatusRepository orderStatusRepository,
                            DeliveryRepository shippingMethodRepository,
                            PaymentRepository paymentMethodRepository,
                            ProductDetailRepository productDetailRepository,
                            UserRepository userRepository,
                            OrderDetailRepository orderDetailRepository,
                            VoucherRepository voucherRepository,
                            OrderHistoryRepository orderHistoryRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.shippingMethodRepository = shippingMethodRepository;
        this.userRepository = userRepository;
        this.productDetailRepository = productDetailRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.voucherRepository = voucherRepository;
        this.orderHistoryRepository = orderHistoryRepository;
    }



    @Override
    public List<OrderResponseDto> getAllOrders() {
        return orderRepository.findAll().stream().map(
                order -> new OrderResponseDto(
                        order.getId(),
                        order.getVoucher() != null ? order.getVoucher().getId() : null,
                        order.getUser() != null ? order.getUser().getId() : null,
                        order.getUser() != null ? order.getUser().getUsersName() : "",  // Thay thế từ getCustomer() sang getUser()
                        order.getPhoneNumber(), // Thay thế từ getCustomer() sang getUser()
                        order.getPayment() != null ? order.getPayment().getPaymentName() : "",
                        order.getAddressDetail(),
                        order.getRecipientName(),
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
    public List<Map<String, Object>> getRevenueByMonthForCurrentYear() {
        List<Map<String, Object>> revenueList = orderRepository.getRevenueByMonthForCurrentYear();

        for (Map<String, Object> revenue : revenueList) {
            Integer month = (Integer) revenue.get("month");
            Double totalRevenue = (Double) revenue.get("totalRevenue");

        }

        return revenueList;
    }

    @Override
    public List<Map<String, Object>> getTotalOrdersByStatus() {
        List<Object[]> ordersByStatusList = orderRepository.getTotalOrdersByStatus();
        List<Map<String, Object>> transformedList = new ArrayList<>();

        for (Object[] orderStatus : ordersByStatusList) {
            Map<String, Object> statusMap = new HashMap<>();
            statusMap.put("statusName", orderStatus[0]);
            statusMap.put("orderCount", orderStatus[1]);
            transformedList.add(statusMap);
        }

        return transformedList;
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


// Tạo đối tượng Order và set các giá trị đã tìm được
        Order order = new Order();
        order.setUser(user);
        order.setDelivery(delivery);
        order.setPayment(payment);
        order.setOrderStatus(orderStatus);
        order.setVoucher(voucher);
        order.setOrderTotal(orderRequestDto.getOrderTotal());
        order.setNote(orderRequestDto.getNote());
        order.setDeleted(true);
        order.setOrderType(orderRequestDto.getOrderType());
        //dịa chỉ giao
        order.setRecipientName(orderRequestDto.getRecipientName());
        order.setPhoneNumber(orderRequestDto.getPhoneNumber());
        order.setAddressDetail(orderRequestDto.getAddressDetail());
        order.setWard(orderRequestDto.getWard());
        order.setDistrict(orderRequestDto.getDistrict());
        order.setCity(orderRequestDto.getCity());

// Lưu vào cơ sở dữ liệu
        orderRepository.save(order);

        OrderHistory timeLine = new OrderHistory();
        timeLine.setOrder(order);
        timeLine.setStatus(orderStatus);
        timeLine.setDeleted(true);
        orderHistoryRepository.save(timeLine);

        return true;
    }
    @Override
    public Boolean deleteOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));
         orderRepository.delete(order);
//        order.setDeleted(false);
//
//        orderRepository.save(order);
        return true;
    }

    @Override
    public Double monthlyRevenue() {
        return orderRepository.monthlyRevenue();
    }

    @Override
    public Double revenueToday() {
        return orderRepository.revenueToday();
    }

    @Override
    public Page<Order> findAllOrdersByUserId(Long userId,Long orderStatusId, Pageable pageable) {
        Page<Order> orderPage;
        if (orderStatusId == null){
            orderPage = orderRepository.findAllOrdersByUserId(userId,pageable);
        }else {
            orderPage = orderRepository.findAllOrdersByUserId(userId,orderStatusId,pageable);
        }
        return orderPage;    }

    @Override
    public Boolean orderCancel(Long id,OrderCancelRequestDto orderCancelRequestDto) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng này!"));

        OrderStatus orderStatus = orderStatusRepository.findById(orderCancelRequestDto.getStatusId()).orElse(null);

        order.setNote(orderCancelRequestDto.getNote());
        order.setOrderStatus(orderStatus);
        orderRepository.save(order);
        //Xét lịch sử đơn hàng
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setOrder(order);
        orderHistory.setStatus(orderStatus);
        orderHistory.setNote(orderCancelRequestDto.getNote());
        orderHistory.setDeleted(true);
        orderHistoryRepository.save(orderHistory);

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
//        try {
//            // Lấy thông tin các đối tượng liên quan từ ID
//            User user = orderRequestDto.getUserId() != null ? userRepository.findById(orderRequestDto.getUserId()).orElse(null) : null;
//            Payment payment = orderRequestDto.getPaymentId() != null ? paymentMethodRepository.findById(orderRequestDto.getPaymentId()).orElse(null) : null;
//            Delivery delivery = orderRequestDto.getDeliveryId() != null ? shippingMethodRepository.findById(orderRequestDto.getDeliveryId()).orElse(null) : null;
//            OrderStatus orderStatus = orderRequestDto.getStatusId() != null ? orderStatusRepository.findById(orderRequestDto.getStatusId()).orElse(null) : null;
//            Voucher voucher = orderRequestDto.getVoucherId() != null ? voucherRepository.findById(orderRequestDto.getVoucherId()).orElse(null) : null;
//
//            // Lấy thông tin đơn hàng từ ID
//            Order order = orderRepository.findById(id)
//                    .orElseThrow(() -> {
//                        System.out.println("Order not found with id: " + id);
//                        return new ResourceNotFoundException("Không tìm thấy id hóa đơn này");
//                    });
//
//            // Cập nhật thông tin đơn hàng
//            order.setUser(user);
//            order.setDelivery(delivery);
//            order.setPayment(payment);
//            order.setOrderStatus(orderStatus);
//            order.setVoucher(voucher);
//            order.setOrderTotal(orderRequestDto.getOrderTotal());
//            order.setNote(orderRequestDto.getNote());
//            order.setOrderTotalInitial(order.getOrderTotalInitial());
//            order.setOrderType(orderRequestDto.getOrderType());
//
//            // Tính toán giảm giá và cập nhật
//            if (voucher != null) {
//                double discountRate = voucher.getDiscountRate();
//                double giamGia = (orderRequestDto.getOrderTotalInitial() * discountRate) / 100;
//                order.setOrderTotal(orderRequestDto.getOrderTotalInitial() - giamGia);
//            }
//
//            // Kiểm tra xem có TimeLine nào đã được tạo mới cho đơn hàng với trạng thái là 2 không
//            OrderHistory existingTimeLine = orderHistoryRepository.findByOrderAndStatusIdAndDeletedTrue(order, 2);
//
//            if (existingTimeLine == null) {
//                // Nếu không có, hãy tạo mới TimeLine
//
//                OrderHistory timeLine = new OrderHistory();
//                timeLine.setOrder(order);
//                timeLine.setStatus(orderStatus);
//                timeLine.setDeleted(true);
//                timeLine.setNote("Đã thanh toán");
//                orderHistoryRepository.save(timeLine);
//            } else {
//                // TimeLine đã tồn tại
//            }
//
//            // Lưu đơn hàng và trả về true
//            orderRepository.save(order);
//
//            List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
//            for (OrderDetail orderDetail : orderDetails) {
//                ProductDetail productDetail = orderDetail.getProductDetail();
//                if (productDetail != null) {
//                    // Lấy số lượng từ productDetail và orderDetail
//                    int productDetailQuantity = productDetail.getQuantity();
//                    int orderDetailQuantity = orderDetail.getQuantity();
//
//                    // Kiểm tra tránh trường hợp số lượng âm
//                    int newProductDetailQuantity = Math.max(productDetailQuantity - orderDetailQuantity, 0);
//
//                    // Cập nhật số lượng mới cho productDetail
//                    productDetail.setQuantity(newProductDetailQuantity);
//
//                    // Lưu productDetail
//                    productDetailRepository.save(productDetail);
//                }
//            }
//            return true;
//        } catch (Exception e) {
//            // Xử lý ngoại lệ và log lỗi nếu cần
//            e.printStackTrace();
//            return false;
//        }
        return null;
    }

    @Override
    public Boolean updateOrdersOnline(OrderRequestDto orderRequestDto, Long id) {
//        try {
//            // Lấy thông tin các đối tượng liên quan từ ID
//            User user = orderRequestDto.getUserId() != null ? userRepository.findById(orderRequestDto.getUserId()).orElse(null) : null;
//            Payment payment = orderRequestDto.getPaymentId() != null ? paymentMethodRepository.findById(orderRequestDto.getPaymentId()).orElse(null) : null;
//            Delivery delivery = orderRequestDto.getDeliveryId() != null ? shippingMethodRepository.findById(orderRequestDto.getDeliveryId()).orElse(null) : null;
//            OrderStatus orderStatus = orderRequestDto.getStatusId() != null ? orderStatusRepository.findById(orderRequestDto.getStatusId()).orElse(null) : null;
//            Voucher voucher = orderRequestDto.getVoucherId() != null ? voucherRepository.findById(orderRequestDto.getVoucherId()).orElse(null) : null;
//
//            // Lấy thông tin đơn hàng từ ID
//            Order order = orderRepository.findById(id)
//                    .orElseThrow(() -> {
//                        System.out.println("Order not found with id: " + id);
//                        return new ResourceNotFoundException("Không tìm thấy id hóa đơn này");
//                    });
//
//            // Cập nhật thông tin đơn hàng
//            order.setUser(user);
//            order.setDelivery(delivery);
//            order.setPayment(payment);
//            order.setOrderStatus(orderStatus);
//            order.setVoucher(voucher);
//            order.setOrderTotal(orderRequestDto.getOrderTotal());
//            order.setNote(orderRequestDto.getNote());
//            order.setOrderTotalInitial(orderRequestDto.getOrderTotalInitial());
//            order.setOrderType(orderRequestDto.getOrderType());
//            order.setRecipientName(orderRequestDto.getRecipientName());
//            order.setPhoneNumber(orderRequestDto.getPhoneNumber());
//            order.setCity(orderRequestDto.getCity());
//            order.setDistrict(orderRequestDto.getDistrict());
//            order.setWard(orderRequestDto.getWard());
//            order.setAddressDetail(orderRequestDto.getAddressDetail());
//
//            // Tính toán giảm giá và cập nhật
//            if (voucher != null) {
//                double discountRate = voucher.getDiscountRate();
//                double giamGia = (orderRequestDto.getOrderTotalInitial() * discountRate) / 100;
//                order.setOrderTotal(orderRequestDto.getOrderTotalInitial() - giamGia);
//            }

            // Kiểm tra xem có TimeLine nào đã được tạo mới cho đơn hàng với trạng thái là 2 không
//            OrderHistory existingTimeLine = orderHistoryRepository.findByOrderAndStatusIdAndDeletedTrue(order, 2);
//            if (existingTimeLine == null) {
//                // Nếu không có, hãy tạo mới TimeLine
//                OrderHistory timeLine = new OrderHistory();
//                timeLine.setOrder(order);
//                timeLine.setStatus(orderStatus);
//                timeLine.setDeleted(true);
//                orderHistoryRepository.save(timeLine);
//
//                OrderHistory timeLine1 = new OrderHistory();
//                timeLine1.setOrder(order);
//                timeLine1.setStatus(orderStatus);
//                timeLine1.setDeleted(true);
//                orderHistoryRepository.save(timeLine1);
//            } else {
//                // TimeLine đã tồn tại
//            }
//            // Lưu đơn hàng và trả về true
//            orderRepository.save(order);
//            return true;
//        } catch (Exception e) {
//            // Xử lý ngoại lệ và log lỗi nếu cần
//            e.printStackTrace();
//            return false;
//        }
        return null;
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
                        order.getRecipientName(),
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
    @Override
    public Boolean updateOrderStatus(Long orderId, OrderCancelRequestDto orderUpdateRequestDto) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));

            // Cập nhật trạng thái của đơn hàng
            OrderStatus orderStatus = orderUpdateRequestDto.getStatusId() != null ? orderStatusRepository.findById(orderUpdateRequestDto.getStatusId()).orElse(null) : null;
            order.setOrderStatus(orderStatus);

            // Lưu đơn hàng để cập nhật trạng thái
            orderRepository.save(order);

            if (orderStatus != null && orderStatus.getId() == 5) {
                List<OrderDetail> orderDetails = orderDetailRepository.findByOrder(order);
                for (OrderDetail orderDetail : orderDetails) {
                    ProductDetail productDetail = orderDetail.getProductDetail();
                    if (productDetail != null) {
                        // Lấy số lượng từ productDetail và orderDetail
                        int productDetailQuantity = productDetail.getQuantity();
                        int orderDetailQuantity = orderDetail.getQuantity();

                        // Kiểm tra tránh trường hợp số lượng âm
                        int newProductDetailQuantity = Math.max(productDetailQuantity - orderDetailQuantity, 0);

                        // Cập nhật số lượng mới cho productDetail
                        productDetail.setQuantity(newProductDetailQuantity);

                        // Lưu productDetail
                        productDetailRepository.save(productDetail);
                    }
                }
            }
            return true;
        } catch (Exception e) {
            // Xử lý ngoại lệ nếu cần
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateOrderStatusCancle(Long orderId, OrderCancelRequestDto orderUpdateRequestDto) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));

            // Cập nhật trạng thái của đơn hàng
            OrderStatus orderStatus = orderUpdateRequestDto.getStatusId() != null ? orderStatusRepository.findById(orderUpdateRequestDto.getStatusId()).orElse(null) : null;
            order.setOrderStatus(orderStatus);
            order.setVoucher(null);
            order.setOrderTotal((double) 0);
            order.setOrderTotalInitial((double) 0);
            order.setNote("Đơn hàng đã hủy");
            // Lưu đơn hàng để cập nhật trạng thái
            orderRepository.save(order);
            return true;
        } catch (Exception e) {
            // Xử lý ngoại lệ nếu cần
            e.printStackTrace();
            return false;
        }
    }








}
