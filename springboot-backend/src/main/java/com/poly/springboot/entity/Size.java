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
@Table(name = "sizes")
@SequenceGenerator(name = "order_sequence", sequenceName = "order_sequence", initialValue = 1000560)
public class Size extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    private Long id;

    @Column(name = "size_name")
    private String sizeName;

    @Column(name = "size_describe")
    private String sizeDescribe;

    @Column(name = "is_deleted")
    private Boolean deleted = false;   // xóa mềm (trạng thái)
}
