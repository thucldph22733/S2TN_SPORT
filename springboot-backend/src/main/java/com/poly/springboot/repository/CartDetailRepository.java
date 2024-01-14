package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail,Long> {

    @Query("SELECT new com.poly.springboot.dto.responseDto.CartDetailResponseDto(" +
            "cd.id, i.imageLink, c.colorName, s.sizeName,m.materialName, p.productName, cd.quantity, pd.price) " +
            "FROM CartDetail cd " +
            "JOIN cd.productDetail pd " +
            "JOIN pd.product p " +
            "JOIN pd.color c " +
            "JOIN pd.size s " +
            "JOIN pd.material m " +
            "JOIN Image i ON i.product.id = p.id  AND i.deleted = true " +
            "WHERE cd.carts.id = :cartId " +
            "ORDER BY cd.createdAt DESC")
    List<CartDetailResponseDto> getCartDetailInfo(@Param("cartId") Long cartId);

    Optional<CartDetail> findByProductDetailIdAndCartsId(Long productDetailId, Long cartId);

}
