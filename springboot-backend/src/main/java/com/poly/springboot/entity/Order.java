package com.poly.springboot.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "delivery_address_id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private OrderStatus orderStatus;

    @CreationTimestamp
    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "delivery_date")
    private Date deliveryDate;

    @Column(name = "received_date")
    private Date receivedDate;

    @Column(name = "category_order")
    private String categoryOrder;

    @Column(name = "orderTotal")
    private Double orderTotal; // tổng tiền

    @Column(name = "orderTotal_initial")
    private Double orderTotalInitial; //tổng tiền ban đầu

    @Column(name = "discount_money")
    private Double discountMoney; // tiền giảm giá

    @Column(name = "note")
    private String note;


}
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
