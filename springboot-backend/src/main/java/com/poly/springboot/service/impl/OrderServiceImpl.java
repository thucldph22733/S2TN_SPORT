package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.OrderDetailRequestDto;
import com.poly.springboot.dto.requestDto.OrderInStoreRequestDto;
import com.poly.springboot.dto.requestDto.OrderRequestDto;
import com.poly.springboot.dto.requestDto.OrderStatusRequestDto;
import com.poly.springboot.entity.*;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.OrderService;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
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
    public List<Map<String, Object>> getRevenueByMonthForCurrentYear(Integer year) {
        List<Map<String, Object>> revenueList = orderRepository.getRevenueByMonthForYear(year);

        for (Map<String, Object> revenue : revenueList) {
            Integer month = (Integer) revenue.get("month");
            Double totalRevenue = (Double) revenue.get("totalRevenue");

        }

        return revenueList;
    }


    @Override
    public List<Map<String, Object>> getTotalOrdersByStatus(LocalDateTime startDate, LocalDateTime endDate) {
        List<Object[]> ordersByStatusList = orderRepository.getTotalOrdersByStatus(startDate, endDate);
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
    public Double getRevenue(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.getRevenue(startDate, endDate);
    }

    @Override
    public Long countCompletedOrdersInDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.countCompletedOrdersInDateRange(startDate, endDate);
    }
    @Override
    public Order findOrderById(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này"));

        return order;
    }

    @Override
    public void generateExcel(HttpServletResponse response) throws IOException {
        List<Order> orders = orderRepository.findAll();

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Orders Info");
        HSSFRow row = sheet.createRow(0);

        row.createCell(0).setCellValue("Mã HD");
        row.createCell(1).setCellValue("Tên khách hàng");
        row.createCell(2).setCellValue("Loại đơn hàng");
        row.createCell(3).setCellValue("Ngày tạo");
        row.createCell(4).setCellValue("Tiền giảm");
        row.createCell(5).setCellValue("Phí giao hàng");
        row.createCell(6).setCellValue("Tổng tiền");
        row.createCell(7).setCellValue("Địa chỉ giao");
        row.createCell(8).setCellValue("Ghi chú");


        int dataRowIndex = 1;

        for (Order order : orders) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex);
            dataRow.createCell(0).setCellValue(order.getId());
            dataRow.createCell(1).setCellValue(order.getUser() != null ? order.getUser().getUsersName() : "Khách lẻ");
            dataRow.createCell(2).setCellValue(order.getOrderType());
            dataRow.createCell(3).setCellValue(order.getCreatedAt());
            dataRow.createCell(4).setCellValue(order.getVoucher() != null ? order.getVoucher().getDiscountRate() : 0);
            dataRow.createCell(5).setCellValue(order.getTransportFee() == null ? 0 : order.getTransportFee());
            dataRow.createCell(6).setCellValue(order.getOrderTotal() == null ? 0 : order.getOrderTotal());
            dataRow.createCell(7).setCellValue(order.getRecipientName()+ order.getPhoneNumber() + order.getAddressDetail() + order.getWard() + order.getDistrict() + order.getCity());
            dataRow.createCell(8).setCellValue(order.getNote());

            dataRowIndex++;
        }

        ServletOutputStream ops = response.getOutputStream();
        workbook.write(ops);
        workbook.close();
        ops.close();
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
        if(user.getDeleted()){
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
            timeLine.setNote(orderRequestDto.getNote());
            orderHistoryRepository.save(timeLine);
            return order;
        }else {
            throw new IllegalStateException("Tài khoản của bạn đã bị khóa");
        }

    }

    @Override
    public Order updateOrder(OrderInStoreRequestDto requestDto) {
        Order order = orderRepository.findById(requestDto.getOrderId()).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));

        OrderStatus orderStatus = (requestDto.getStatusName() != null) ? orderStatusRepository.findByStatusName(requestDto.getStatusName()).orElse(null) : null;

        order.setOrderStatus(orderStatus);
        order.setOrderTotal(requestDto.getOrderTotal());
        order.setNote(requestDto.getNote());
        order.setTransportFee(requestDto.getTransportFee());
        //dịa chỉ giao
        order.setRecipientName(requestDto.getRecipientName());
        order.setPhoneNumber(requestDto.getPhoneNumber());
        order.setAddressDetail(requestDto.getAddressDetail());
        order.setWard(requestDto.getWard());
        order.setDistrict(requestDto.getDistrict());
        order.setCity(requestDto.getCity());
        // Lưu vào cơ sở dữ liệu
        orderRepository.save(order);

        OrderHistory timeLine = new OrderHistory();
        timeLine.setOrder(order);
        timeLine.setNote(requestDto.getNote());
        timeLine.setStatus(orderStatus);
        orderHistoryRepository.save(timeLine);
        return order;
    }

    @Override
    public Order updateOrderVoucher(Long orderId, String voucherCode) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));

        Voucher voucher = (voucherCode != null) ? voucherRepository.findByVoucherCode(voucherCode) : null;

        order.setVoucher(voucher);
        orderRepository.save(order);
        return order;
    }

    @Override
    public Order updateOrderUser(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));

        User user = (userId != null) ? userRepository.findById(userId).orElse(null) : null;
        order.setUser(user);
        orderRepository.save(order);
        return order;
    }

    @Override
    public Order createOrderInStore() {
        OrderStatus orderStatus = orderStatusRepository.findByStatusName("Tạo đơn hàng").orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy trạng thái hóa đơn này!"));
        Order order = new Order();
        order.setOrderStatus(orderStatus);
        order.setOrderType("Tại quầy");
        orderRepository.save(order);
        OrderHistory timeLine = new OrderHistory();
        timeLine.setOrder(order);
        timeLine.setStatus(orderStatus);
        orderHistoryRepository.save(timeLine);

        return order;
    }

    @Override
    public Boolean deleteOrder(Long id) {
        // Tìm hóa đơn theo id
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id hóa đơn này!"));

        // Lấy danh sách chi tiết hóa đơn của hóa đơn
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(id);

        // Xóa từng chi tiết hóa đơn
        for (OrderDetail orderDetail : orderDetails) {
            orderDetailRepository.delete(orderDetail);
        }

        OrderHistory orderHistory = orderHistoryRepository.findByOrderId(order.getId());
        orderHistoryRepository.delete(orderHistory);
        // Xóa hóa đơn
        orderRepository.delete(order);

        return true;
    }


    @Override
    public Page<Order> findAllOrdersByUserId(Long userId, String orderStatusName, Pageable pageable) {

        return orderRepository.findAllOrdersByUserId(userId, orderStatusName, pageable);
    }



}
