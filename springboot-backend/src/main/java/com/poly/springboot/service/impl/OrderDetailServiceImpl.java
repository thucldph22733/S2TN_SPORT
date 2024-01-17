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
    public Boolean createOrderDetail(OrderDetailInStoreRequestDto orderDetailRequestDto) {
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

                    // Giảm số lượng trong ProductDetail
                    productDetail.setQuantity(productDetail.getQuantity() - requestedQuantity);
                    // Lưu cập nhật ProductDetail
                    productDetailRepository.save(productDetail);

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

                // Giảm số lượng trong ProductDetail
                productDetail.setQuantity(productDetail.getQuantity() - orderDetailRequestDto.getQuantity());
                // Lưu cập nhật ProductDetail
                productDetailRepository.save(productDetail);

                // Lưu OrderDetail
                orderDetailRepository.save(orderDetail);
            }
            return true;
        } else {
            throw new ResourceNotFoundException("Không tìm thấy ProductDetail hoặc Order");
        }
    }

    @Override
    public Boolean updateQuantityOrderDetail(Integer quantity, Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn chi tiết này!"));
        // Get the associated ProductDetail
        ProductDetail productDetail = orderDetail.getProductDetail();


        System.out.println("quantity" + quantity);
        System.out.println("productDetail.getQuantity" + productDetail.getQuantity());
        System.out.println("(productDetail.getQuantity) " + (productDetail.getQuantity() - quantity));
        if ( productDetail.getQuantity() - quantity <= 0 ){
            throw new IllegalArgumentException("Số lượng sản phẩm không đủ");
        }else {
            // Calculate the difference in quantity
            int quantityDifference = quantity - orderDetail.getQuantity() + quantity;

            // Update the quantity in OrderDetail
            orderDetail.setQuantity(quantity);
            orderDetailRepository.save(orderDetail);

            // Check if ProductDetail is not null (just to be safe)
            if (productDetail != null) {
                // Update the quantity in ProductDetail
                productDetail.setQuantity(productDetail.getQuantity() - quantityDifference);
                // Save the updated ProductDetail
                productDetailRepository.save(productDetail);
            }
        }

        return true;
    }




    @Override
    public Optional<OrderDetail> findByOrderIdAndProductDetailId(Long orderId, Long productDetailId) {
        return orderDetailRepository.findByOrderIdAndProductDetailId(orderId, productDetailId);
    }

    @Override
    public Boolean deleteOrderDetail(Long id) {
        OrderDetail orderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy hóa đơn chi tiết"));

        // Get the associated ProductDetail
        ProductDetail productDetail = orderDetail.getProductDetail();

        // Xóa OrderDetail
        orderDetailRepository.delete(orderDetail);

        if (productDetail != null) {
            productDetail.setQuantity(productDetail.getQuantity() + orderDetail.getQuantity());
            productDetailRepository.save(productDetail);
        }

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

