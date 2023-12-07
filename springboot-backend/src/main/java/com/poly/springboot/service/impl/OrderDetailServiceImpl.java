package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.responseDto.OrderDetailResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.OrderDetail;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.entity.Voucher;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.OrderDetailRepository;
import com.poly.springboot.repository.OrderRepository;
import com.poly.springboot.repository.ProductDetailRepository;
import com.poly.springboot.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    private OrderDetailRepository orderDetailRepository;
    private ProductDetailRepository productDetailRepository;
    private OrderRepository orderRepository;

    @Autowired
    public OrderDetailServiceImpl(OrderDetailRepository orderDetailRepository,
                                  ProductDetailRepository productDetailRepository,
                                  OrderRepository orderRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.productDetailRepository = productDetailRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public List<OrderDetailResponseDto> getOrderDetails() {
        return orderDetailRepository.findAll()
                .stream().map(
                        orderDetail -> new OrderDetailResponseDto(
                                orderDetail.getId(),
                                orderDetail.getOrder().getId(),
                                orderDetail.getProductDetail().getId(),
                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getProduct().getProductAvatar() : " ",
                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getColor().getColorName() :" ",
                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getSize().getSizeName(): " ",
                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getProduct().getProductName(): " ",
                                orderDetail.getQuantity(),
                                orderDetail.getPrice(),
                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getPrice(): 0,
                                orderDetail.getOrder().getOrderTotal(),
                                orderDetail.getStatus(),
                                orderDetail.getNote())
                ).collect(Collectors.toList());
    }

    @Override
    public Boolean createOrderDetail(OrderDetailRequestDto orderDetailRequestDto) throws Exception {
        // Tìm ProductDetail theo ID
        ProductDetail productDetail = productDetailRepository.findById(orderDetailRequestDto.getProductDetailId()).orElse(null);

        // Tìm Order theo ID
        Order order = orderRepository.findById(orderDetailRequestDto.getOrderId()).orElse(null);

        if (productDetail != null && order != null) {
            // Kiểm tra xem ProductDetail đã tồn tại trong Order chưa
            Optional<OrderDetail> existingOrderDetail = orderDetailRepository.findByOrderIdAndProductDetailId(order.getId(), productDetail.getId());

            if (existingOrderDetail.isPresent()) {
                // Nếu ProductDetail đã tồn tại trong Order, cộng thêm số lượng
                OrderDetail orderDetail = existingOrderDetail.get();
                int requestedQuantity = orderDetailRequestDto.getQuantity();

                // Kiểm tra xem có đủ số lượng để cộng không
                if (productDetail.getQuantity() >= requestedQuantity) {
                    // Cộng thêm số lượng vào OrderDetail
                    orderDetail.setQuantity(orderDetail.getQuantity() + requestedQuantity);

                    // Tính tổng giá trị (số lượng * giá) và cập nhật vào OrderDetail
                    double totalPrice = orderDetail.getQuantity() * productDetail.getPrice();
                    orderDetail.setPrice(totalPrice);
                    orderDetail.setNote(orderDetailRequestDto.getNote());

                    // Lưu cập nhật OrderDetail
                    orderDetailRepository.save(orderDetail);
                } else {
                    // Xử lý trường hợp không đủ số lượng
                    throw new RuntimeException("Số lượng sản phẩm không đủ");
                }
            } else {
                // Nếu ProductDetail chưa tồn tại trong Order, tạo mới OrderDetail
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setOrder(order);
                orderDetail.setProductDetail(productDetail);
                orderDetail.setQuantity(orderDetailRequestDto.getQuantity());

                // Tính tổng giá trị (số lượng * giá) và set vào OrderDetail
                double totalPrice = orderDetailRequestDto.getQuantity() * productDetail.getPrice();
                orderDetail.setPrice(totalPrice);

                orderDetail.setStatus(0);
                orderDetail.setNote(orderDetailRequestDto.getNote());

                // Lưu OrderDetail
                orderDetailRepository.save(orderDetail);
            }

            // Cập nhật lại tổng giá trị của hóa đơn sau mỗi lần thêm OrderDetail
            double orderTotal = orderDetailRepository.calculateOrderTotal(order.getId());
            order.setOrderTotalInitial(orderTotal);
            orderRepository.save(order);

            return true;
        } else {
            // Xử lý trường hợp không tìm thấy ProductDetail hoặc Order
            throw new Exception("Không tìm thấy ProductDetail hoặc Order");
        }
    }





    @Override
    public Boolean updateOrderDetail(OrderDetailRequestDto orderDetailRequestDto, Long id) {
        // Log giá trị id để kiểm tra
        System.out.println("Received id: " + id);

        //find productDetail by id
        ProductDetail productDetail = productDetailRepository.findById(orderDetailRequestDto.getProductDetailId()).orElse(null);
        //find orderRepository by id
        Order order = orderRepository.findById(orderDetailRequestDto.getOrderId()).orElse(null);

        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("hóa đơn chi tiết", String.valueOf(id)));
        orderDetail.setOrder(order);
        orderDetail.setProductDetail(productDetail);
        orderDetail.setQuantity(orderDetailRequestDto.getQuantity());
        double totalPrice = orderDetailRequestDto.getQuantity() * productDetail.getPrice();
        orderDetail.setPrice(totalPrice);
        orderDetail.setStatus(orderDetailRequestDto.getStatus());
        orderDetail.setNote(orderDetailRequestDto.getNote());
        orderDetailRepository.save(orderDetail);
        double orderTotal = orderDetailRepository.calculateOrderTotal(order.getId());
        order.setOrderTotalInitial(orderTotal);
        orderRepository.save(order);
        return true;
    }


    @Override
    public List<OrderDetailResponseDto> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId).stream().map(
                orderDetail -> new OrderDetailResponseDto(
                        orderDetail.getId(),
                        orderDetail.getOrder().getId(),
                        orderDetail.getProductDetail().getId(),
                        orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getProduct().getProductAvatar() : " ",
                        orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getColor().getColorName() :" ",
                        orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getSize().getSizeName(): " ",
                        orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getProduct().getProductName(): " ",
                        orderDetail.getQuantity(),
                        orderDetail.getPrice(),
                        orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getPrice(): 0,
                        orderDetail.getOrder().getOrderTotal(),
                        orderDetail.getStatus(),
                        orderDetail.getNote())
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<OrderDetail> findByOrderIdAndProductDetailId(Long orderId, Long productDetailId) {
        return orderDetailRepository.findByOrderIdAndProductDetailId(orderId, productDetailId);
    }

    @Override
    public Boolean deleteOrderDetail(Long id) {
        try {
            OrderDetail orderDetail = orderDetailRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Hóa đơn chi tiết", String.valueOf(id)));

            Order order = orderDetail.getOrder();

            // Xóa OrderDetail
            orderDetailRepository.delete(orderDetail);

            // Cập nhật discountMoney và orderTotal của Order
            double orderTotal = orderDetailRepository.calculateOrderTotal(order.getId());
            double discountMoney = calculateDiscountMoney(order); // Thêm hàm tính discountMoney

            order.setOrderTotalInitial(orderTotal);
            order.setDiscountMoney(discountMoney);
            order.setOrderTotal(orderTotal - discountMoney); // Cập nhật orderTotal sau khi giảm giá

            orderRepository.save(order);

            return true;
        } catch (Exception e) {
            // Xử lý ngoại lệ và log lỗi nếu cần
            e.printStackTrace();
            return false;
        }
    }

    private double calculateDiscountMoney(Order order) {
        // Lấy thông tin voucher từ Order
        Voucher voucher = order.getVoucher();

        if (voucher != null) {
            // Nếu có voucher, tính discountMoney dựa trên tỷ lệ giảm giá và tổng tiền đơn hàng
            double discountRate = voucher.getDiscountRate();
            double orderTotalInitial = order.getOrderTotalInitial();

            return (orderTotalInitial * discountRate) / 100;
        } else {
            // Nếu không có voucher, discountMoney sẽ là 0
            return 0;
        }
    }

}
