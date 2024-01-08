package com.poly.springboot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "address")
@SequenceGenerator(name = "order_sequence", sequenceName = "order_sequence", initialValue = 1000560)
public class Address extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    private Long id;

    @Column(name = "recipient_name")
    private String recipientName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address_detail")
    private String addressDetail;

    @Column(name = "ward")  // phuong/ xa
    private String ward;

    @Column(name = "district") //quan/ huyen
    private String district;

    @Column(name = "city")  //tinh/thanh pho
    private String city;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private User user;

    @Column(name = "is_deleted")
    private Boolean deleted = false;   // xóa mềm (trạng thái)
}
