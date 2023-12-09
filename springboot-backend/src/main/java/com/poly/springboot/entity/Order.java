package com.poly.springboot.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

    @ManyToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @Column(name = "order_type")
    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    @Column(name = "orderTotal")
    private Double orderTotal;

    @Column(name = "note")
    private String note;

    @Column(name = "recipient_name")
    private String recipientName;   // ten nguoi nhan

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address_detail")
    private String addressDetail;   // so nha, ngo, duong

    @Column(name = "ward")  // phuong/ xa
    private String ward;

    @Column(name = "district") //quan/ huyen
    private String district;

    @Column(name = "city")  //tinh/thanh pho
    private String city;

    @Column(name = "order_status")
    private OrderStatus orderStatus;

}
