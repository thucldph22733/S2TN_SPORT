package com.poly.springboot.service.impl;

import com.poly.springboot.config.VNPayConfig;
import com.poly.springboot.dto.requestDto.PaymentRequestDto;
import com.poly.springboot.dto.responseDto.PaymentResponseDto;
import com.poly.springboot.entity.Order;
import com.poly.springboot.entity.Payment;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.OrderRepository;
import com.poly.springboot.repository.PaymentRepository;
import com.poly.springboot.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Payment getPayments(String vnp_Amount,
                               String vnp_OrderInfo,
                               String vnp_PayDate,
                               String vnp_TxnRef) {
        Payment payment = new Payment();
        payment.setPaymentDate(vnp_PayDate);
        payment.setAmount(Double.valueOf(vnp_TxnRef));
        Order order = orderRepository.findById(Long.valueOf(vnp_TxnRef)).orElse(null);
        payment.setOrders(order);
        payment.setPaymentMethod("Thanh toán VNPay");
        payment.setStatus("Đã thanh toán");
        payment.setNote(vnp_OrderInfo);
        paymentRepository.save(payment);
        return payment;
    }

    @Override  //Method save payment
    public PaymentResponseDto createPayment(PaymentRequestDto paymentRequestDto) throws UnsupportedEncodingException {

        long amount = (paymentRequestDto.getAmount()) * 100;

        String vnp_TxnRef = String.valueOf(paymentRequestDto.getOrderId());

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPayConfig.vnp_Version);
        vnp_Params.put("vnp_Command", VNPayConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", VNPayConfig.vnp_CurrCode);
        vnp_Params.put("vnp_BankCode", VNPayConfig.vnp_bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", VNPayConfig.orderType);
        vnp_Params.put("vnp_Locale", VNPayConfig.vnp_Locale);
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", VNPayConfig.vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }

        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;

        PaymentResponseDto paymentResponse = new PaymentResponseDto();
        paymentResponse.setCode("00");
        paymentResponse.setMessage("success");
        paymentResponse.setData(paymentUrl);
        return paymentResponse;
    }

    @Override  //Method update payment
    public Boolean updatePayment(PaymentRequestDto paymentRequestDto, Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id phương thức thanh toán này!"));

//        payment.setPaymentName(paymentRequestDto.getPaymentName());
//        payment.setPaymentDescribe(paymentRequestDto.getPaymentDescribe());

        paymentRepository.save(payment);

        return true;
    }

}
