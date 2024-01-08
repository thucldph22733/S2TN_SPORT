package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.entity.*;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private OrderStatusRepository orderStatusRepository;
    private UserRepository userRepository;
    private VoucherRepository voucherRepository;
    private OrderDetailRepository orderDetailRepository;
    private OrderHistoryRepository orderHistoryRepository;
    private ProductDetailRepository productDetailRepository;
    private CartRepository cartRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderStatusRepository orderStatusRepository,
                            ProductDetailRepository productDetailRepository,
                            UserRepository userRepository,
                            OrderDetailRepository orderDetailRepository,
                            VoucherRepository voucherRepository,
                            OrderHistoryRepository orderHistoryRepository,
                            CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.orderStatusRepository = orderStatusRepository;
        this.userRepository = userRepository;
        this.productDetailRepository = productDetailRepository;
        this.voucherRepository = voucherRepository;
        this.orderHistoryRepository = orderHistoryRepository;
        this.cartRepository = cartRepository;
    }


    @Override
    public Boolean updateOrderStatus(OrderStatusRequestDto orderStatusRequestDto) {
        Order order = orderRepository.findById(orderStatusRequestDto.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng này!"));

        OrderStatus orderStatus = orderStatusRepository.findByStatusName(orderStatusRequestDto.getNewStatusName()).orElse(null);

        // Kiểm tra nếu trạng thái mới là "Đã hủy"
        if (orderStatusRequestDto.getNewStatusName().equals("Đã hủy")) {
            // Thực hiện các thao tác cộng lại số lượng sản phẩm
            List<OrderDetail> orderDetails = order.getOrderDetails();
            for (OrderDetail orderDetail : orderDetails) {
                ProductDetail productDetail = orderDetail.getProductDetail();
                productDetail.setQuantity(productDetail.getQuantity() + orderDetail.getQuantity());
                productDetailRepository.save(productDetail);
            }
        }

        order.setNote(orderStatusRequestDto.getNote());
        order.setOrderStatus(orderStatus);
        orderRepository.save(order);

        // Xét lịch sử đơn hàng
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setOrder(order);
        orderHistory.setStatus(orderStatus);
        orderHistory.setNote(orderStatusRequestDto.getNote());
        orderHistoryRepository.save(orderHistory);

        return true;
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
    public Page<Order> getAllOrders(String orderStatusName, String orderId, String orderType, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        return orderRepository.findAllByStatusNameAndDeletedIsTrue(orderStatusName, orderId, orderType, startDate, endDate, pageable);
    }

    @Override
    public List<Order> findAllOrderByStatusName() {
        return orderRepository.findAllOrderByStatusName();
    }

    @Override
    public Order createOrderOnline(OrderRequestDto orderRequestDto) {

        User user = (orderRequestDto.getUserId() != null) ? userRepository.findById(orderRequestDto.getUserId()).orElse(null) : null;

        // Kiểm tra và tìm đối tượng voucher
        Voucher voucher = (orderRequestDto.getVoucherId() != null) ? voucherRepository.findById(orderRequestDto.getVoucherId()).orElse(null) : null;

        // Tìm đối tượng OrderStatus (set luôn là null nếu không tìm thấy)
        OrderStatus orderStatus = (orderRequestDto.getStatusName() != null) ? orderStatusRepository.findByStatusName(orderRequestDto.getStatusName()).orElse(null) : null;

        // Tạo đối tượng Order và set các giá trị đã tìm được
        Order order = new Order();
        order.setUser(user);

        order.setOrderStatus(orderStatus);
        order.setVoucher(voucher);
        order.setOrderTotal(orderRequestDto.getOrderTotal());
        order.setNote(orderRequestDto.getNote());
        order.setOrderType("Online");
        order.setTransportFee(orderRequestDto.getTransportFee());

        //dịa chỉ giao
        order.setRecipientName(orderRequestDto.getRecipientName());
        order.setPhoneNumber(orderRequestDto.getPhoneNumber());
        order.setAddressDetail(orderRequestDto.getAddressDetail());
        order.setWard(orderRequestDto.getWard());
        order.setDistrict(orderRequestDto.getDistrict());
        order.setCity(orderRequestDto.getCity());

        // Lưu vào cơ sở dữ liệu
        orderRepository.save(order);

        // Đối với trường hợp người dùng không đăng nhập, sử dụng dữ liệu từ orderRequestDto
        if (user == null) {
            List<OrderDetailRequestDto> orderDetails = orderRequestDto.getOrderDetail();
            for (OrderDetailRequestDto detailDto : orderDetails) {
                OrderDetail orderDetail = new OrderDetail();
                //tìm ra sản phẩm rồi trừ đi số lượng
                ProductDetail productDetail = productDetailRepository.findById(detailDto.getProductDetailId()).orElse(null);
                productDetail.setQuantity(productDetail.getQuantity() - detailDto.getQuantity());
                productDetailRepository.save(productDetail);

                orderDetail.setProductDetail(productDetail);
                orderDetail.setOrder(order);
                orderDetail.setQuantity(detailDto.getQuantity());
                orderDetail.setPrice(detailDto.getPrice());

                // Lưu hóa đơn chi tiết
                orderDetailRepository.save(orderDetail);
            }
        } else {
            // Lấy giỏ hàng của người dùng
            Optional<Cart> optionalCart = cartRepository.findByUserId(orderRequestDto.getUserId());

            if (optionalCart.isPresent()) {
                Cart cart = optionalCart.get();

                // Lưu danh sách chi tiết đơn hàng từ giỏ hàng
                List<CartDetail> cartDetails = cart.getCartDetails();
                for (CartDetail cartDetail : cartDetails) {
                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setProductDetail(cartDetail.getProductDetail());
                    orderDetail.setOrder(order);
                    orderDetail.setQuantity(cartDetail.getQuantity());
                    orderDetail.setPrice(cartDetail.getProductDetail().getPrice()); // Bạn có thể sửa giá cả theo logic của bạn

                    // Lưu hóa đơn chi tiết
                    orderDetailRepository.save(orderDetail);

                    // Trừ số lượng sản phẩm trong kho (hoặc cập nhật trạng thái nếu có thêm logic cụ thể)
                    ProductDetail productDetail = cartDetail.getProductDetail();
                    productDetail.setQuantity(productDetail.getQuantity() - cartDetail.getQuantity());
                    productDetailRepository.save(productDetail);
                }

                // Xóa giỏ hàng sau khi đã tạo đơn hàng thành công
                cartRepository.delete(cart);
            }
        }


        OrderHistory timeLine = new OrderHistory();
        timeLine.setOrder(order);
        timeLine.setStatus(orderStatus);
        orderHistoryRepository.save(timeLine);
        return order;
    }

    @Override
    public Order createOrderInStore() {
        OrderStatus orderStatus = orderStatusRepository.findByStatusName("Tạo đơn hàng").orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy trạng thái hóa đơn này!"));
        Order order = new Order();
        order.setOrderStatus(orderStatus);
        order.setOrderType("Tại quầy");
        orderRepository.save(order);
        return order;
    }

    @Override
    public Boolean deleteOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));
        orderRepository.delete(order);

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
    public Page<Order> findAllOrdersByUserId(Long userId, String orderStatusName, Pageable pageable) {

        return orderRepository.findAllOrdersByUserId(userId, orderStatusName, pageable);
    }

//    @Override
//    public Boolean orderCancel(Long id, OrderCancelRequestDto orderCancelRequestDto) {
//
//        Order order = orderRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng này!"));
//
//        OrderStatus orderStatus = orderStatusRepository.findById(orderCancelRequestDto.getStatusId()).orElse(null);
//
//        order.setNote(orderCancelRequestDto.getNote());
//        order.setOrderStatus(orderStatus);
//        orderRepository.save(order);
//        //Xét lịch sử đơn hàng
//        OrderHistory orderHistory = new OrderHistory();
//        orderHistory.setOrder(order);
//        orderHistory.setStatus(orderStatus);
//        orderHistory.setNote(orderCancelRequestDto.getNote());
//        orderHistory.setDeleted(true);
//        orderHistoryRepository.save(orderHistory);
//
//        return true;
//    }


}
