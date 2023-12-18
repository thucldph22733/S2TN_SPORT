package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail,Long> {

    @Query("SELECT new com.poly.springboot.dto.responseDto.CartDetailResponseDto(" +
            "cd.id, c.colorName, s.sizeName, p.productName, cd.quantity, pd.price) " +
            "FROM CartDetail cd " +
            "JOIN cd.productDetail pd " +
            "JOIN pd.product p " +
            "JOIN pd.color c " +
            "JOIN pd.size s " +
            "WHERE cd.cart.id = :cartId")
    List<CartDetailResponseDto> getCartDetailInfo(@Param("cartId") Long cartId);

}
