package com.poly.springboot.entity;

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
@Table(name = "suppliers")
@SequenceGenerator(name = "order_sequence", sequenceName = "order_sequence", initialValue = 1000560)
public class Supplier extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    private Long id;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "supplier_describe")
    private String supplierDescribe;

    @Column(name = "is_deleted")
    private Boolean deleted = false;   // xóa mềm (trạng thái)


}
