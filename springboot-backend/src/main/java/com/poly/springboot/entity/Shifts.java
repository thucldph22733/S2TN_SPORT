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
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shifts")
public class Shifts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @CreationTimestamp
    @Column(name = "start_date")
    private LocalDateTime startDate;

    @UpdateTimestamp
    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "initia_amount")  //so tien ban dau;
    private Double initiaAmount;

    @Column(name = "total_revenue")  //tong doanh thu
    private Double totalRevenue;

    @Column(name = "cash")  //tien mat
    private Double cash;

    @Column(name = "transfer_money")  //tien chuyen khoan
    private Double transferMoney;

    @Column(name = "total_available_money")   //tong tien hien tai
    private Double totalAvailableMoney;

    @Column(name = "money_arises")  //tien phat sinh
    private Double moneyArises;

    @Column(name = "note")
    private String note;
}
