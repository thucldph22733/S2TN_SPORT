package com.poly.springboot.repository;

import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail,Long> {

//    @Query(value = "select cd.id,p.product_avatar,colors.color_name,sizes.size_name,p.product_name,cd.quantity,pd.price\n" +
//            "from product_details as pd  \n" +
//            "join products as p on pd.product_id = p.id \n" +
//            "join cart_details as cd on pd.id = cd.product_detail_id\n" +
//            "join colors on pd.color_id = colors.id \n" +
//            "join sizes on pd.size_id = sizes.id;",nativeQuery = true)
//    List<CartDetailResponseDto> getCartDetails();
}
