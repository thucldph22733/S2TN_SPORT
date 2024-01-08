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
@Table(name = "brands")
@SequenceGenerator(name = "order_sequence", sequenceName = "order_sequence", initialValue = 1000560)
public class Brand extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    private Long id;

    @Column(name = "brand_name")
    private String brandName;

    @Column(name = "brand_describe")
    private String brandDescribe;

    @Column(name = "is_deleted")
    private Boolean deleted = false;   // xóa mềm (trạng thái)

}
