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


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_avatar")
    private String productAvatar;

    @Column(name = "product_hot")
    private Boolean productHot;

    @Column(name = "product_sale")
    private Boolean productSale;

    @Column(name = "product_new")
    private Boolean productNew;

    @Column(name = "view_count")
    private Integer viewCount;

    @Column(name = "product_describe")
    private String productDescribe;

    @Column(name = "product_status")
    private Boolean status;

}
