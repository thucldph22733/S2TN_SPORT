//package com.poly.springboot.entity;
//
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.hibernate.annotations.CreationTimestamp;
//
//import java.time.LocalDateTime;
//import java.util.Date;
//
//@Setter
//@Getter
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table(name = "orders")
//public class Order {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "staff_id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "delivery_id")
//    private Delivery delivery;
//
//    @ManyToOne
//    @JoinColumn(name = "payment_id")
//    private Payment payment;
//
//    @ManyToOne
//    @JoinColumn(name = "voucher_id")
//    private Voucher voucher;
//
//    @Column(name = "order_type")
//    @Enumerated(EnumType.STRING)
//    private OrderType orderType;
//
//    @Column(name = "orderTotal")
//    private Double orderTotal;
//
//    @Column(name = "note")
//    private String note;
//
//    @Column(name = "recipient_name")
//    private String recipientName;
//
//    @Column(name = "phone_number")
//    private String phoneNumber;
//
//    @Column(name = "address_detail")
//    private String addressDetail;
//
//    @Column(name = "region")  // phuong/ xa
//    private String region;
//
//    @Column(name = "district") //quan/ huyen
//    private String district;
//
//    @Column(name = "city")  //tinh/thanh pho
//    private String city;
//
//    @Column(name = "order_status")
//    @Enumerated(EnumType.STRING)
//    private OrderStatus orderStatus;
//
//}
