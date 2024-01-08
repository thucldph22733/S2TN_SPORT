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
@Table(name = "categories")
@SequenceGenerator(name = "order_sequence", sequenceName = "order_sequence", initialValue = 1000560)
public class Category extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    private Long id;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_describe")
    private String categoryDescribe;

    @Column(name = "is_deleted")
    private Boolean deleted = false;   // xóa mềm (trạng thái)
}
