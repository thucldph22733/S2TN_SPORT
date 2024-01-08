package com.poly.springboot.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
@SequenceGenerator(name = "order_sequence", sequenceName = "order_sequence", initialValue = 1000560)
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "voucher_id")
    private Voucher voucher;

    @JoinColumn(name = "order_type")
    private String orderType;

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

    @ManyToOne
    @JoinColumn(name = "order_status_id")
    private OrderStatus orderStatus;

    @Column(name = "note")
    private String note;

    @Column(name = "orderTotal")
    private Double orderTotal; // tổng tiền

    @Column(name = "transport_fee")
    private Integer transportFee; //Phí giao hàng

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;
}
