package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderDetailInStoreRequestDto;
import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
//        return orderDetailRepository.findAll()
//                .stream().map(
//                        orderDetail -> new OrderDetailResponseDto(
//                                orderDetail.getId(),
//                                orderDetail.getOrder().getId(),
//                                orderDetail.getProductDetail().getId(),
////                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getProduct().getAvatar() : " ",
//                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getColor().getColorName() :" ",
//                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getSize().getSizeName(): " ",
//                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getProduct().getProductName(): " ",
//                                orderDetail.getQuantity(),
//                                orderDetail.getPrice(),
//                                orderDetail.getProductDetail() != null ? orderDetail.getProductDetail().getPrice(): 0,
//                                orderDetail.getOrder().getOrderTotal(),
//                                orderDetail.getNote())
//                ).collect(Collectors.toList());
        return null;
    }

    @Override
    public Integer getTotalQuantitySoldThisMonth() {
        return orderDetailRepository.getTotalQuantitySoldThisMonth().orElse(0);
    }

    @Override
    public Page<OrderDetailResponseDto> getOrderDetailByOrderId(Long orderId, Pageable pageable) {
        return orderDetailRepository.findOrderDetailByOrderId(orderId,pageable);
    }

    @Override
    public Boolean createOrderDetail(OrderDetailInStoreRequestDto orderDetailRequestDto){
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
                    orderDetail.setPrice(productDetail.getPrice());

                    // Lưu cập nhật OrderDetail
                    orderDetailRepository.save(orderDetail);
                } else {
                    // Xử lý trường hợp không đủ số lượng
                    throw new ResourceNotFoundException("Số lượng sản phẩm không đủ");
                }
            } else {
                // Nếu ProductDetail chưa tồn tại trong Order, tạo mới OrderDetail
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setOrder(order);
                orderDetail.setProductDetail(productDetail);
                orderDetail.setQuantity(orderDetailRequestDto.getQuantity());
                orderDetail.setPrice(orderDetailRequestDto.getPrice());
                // Lưu OrderDetail
                orderDetailRepository.save(orderDetail);
            }
            return true;
        } else {
            throw new ResourceNotFoundException("Không tìm thấy ProductDetail hoặc Order");
        }
    }



    @Override
    public Boolean updateOrderDetail(OrderDetailRequestDto orderDetailRequestDto, Long id) {
        // Log giá trị id để kiểm tra
//        System.out.println("Received id: " + id);
//
//        //find productDetail by id
//        ProductDetail productDetail = productDetailRepository.findById(orderDetailRequestDto.getProductDetailId()).orElse(null);
//        //find orderRepository by id
////        Order order = orderRepository.findById(orderDetailRequestDto.getOrderId()).orElse(null);
//
//        OrderDetail orderDetail = orderDetailRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn chi tiết"));
//
//        orderDetail.setOrder(order);
//        orderDetail.setProductDetail(productDetail);
//        orderDetail.setQuantity(orderDetailRequestDto.getQuantity());
//        orderDetail.setPrice(productDetail.getPrice());
////        orderDetail.setNote(orderDetailRequestDto.getNote());
//
//        orderDetailRepository.save(orderDetail);
//
//        double orderTotal = orderDetailRepository.calculateOrderTotal(order.getId());
////        order.setOrderTotalInitial(orderTotal);
//        orderRepository.save(order);

        return true;
    }




    @Override
    public Optional<OrderDetail> findByOrderIdAndProductDetailId(Long orderId, Long productDetailId) {
        return orderDetailRepository.findByOrderIdAndProductDetailId(orderId, productDetailId);
    }

    @Override
    public Boolean deleteOrderDetail(Long id) {

            OrderDetail orderDetail = orderDetailRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm tháy hóa đơn chi tiết"));

            // Xóa OrderDetail
            orderDetailRepository.delete(orderDetail);


            return true;

    }

    private double calculateDiscountMoney(Order order) {
//        // Lấy thông tin voucher từ Order
//        Voucher voucher = order.getVoucher();
//
//        if (voucher != null) {
//            // Nếu có voucher, tính discountMoney dựa trên tỷ lệ giảm giá và tổng tiền đơn hàng
//            double discountRate = voucher.getDiscountRate();
////            double orderTotalInitial = order.getOrderTotalInitial();
//
////            return (orderTotalInitial * discountRate) / 100;
////        } else {
////            // Nếu không có voucher, discountMoney sẽ là 0
////            return 0;
////        }
////    }
        return 3;
    }
}

