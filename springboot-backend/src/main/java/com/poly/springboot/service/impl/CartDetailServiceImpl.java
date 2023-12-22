package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CartDetailRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.entity.Cart;
import com.poly.springboot.entity.CartDetail;
import com.poly.springboot.entity.ProductDetail;
import com.poly.springboot.entity.User;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.CartDetailRepository;
import com.poly.springboot.repository.CartRepository;
import com.poly.springboot.repository.ProductDetailRepository;
import com.poly.springboot.repository.UserRepository;
import com.poly.springboot.service.CartDetailService;
import com.poly.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartDetailServiceImpl implements CartDetailService {

    private CartDetailRepository cartDetailRepository;

    private ProductDetailRepository productDetailRepository;

    private CartRepository cartRepository;


    private CartService cartService;
    @Autowired
    public CartDetailServiceImpl(CartDetailRepository cartDetailRepository,
                                 ProductDetailRepository productDetailRepository,
                                 CartRepository cartRepository) {
        this.cartDetailRepository = cartDetailRepository;
        this.productDetailRepository = productDetailRepository;
        this.cartRepository = cartRepository;

    }

    @Override
    public List<CartDetailResponseDto> getAllCartDetailByCartId(Long cartId) {
        return cartDetailRepository.getCartDetailInfo(cartId);
    }

    @Override
    public Boolean createCartDetail(CartDetailRequestDto cartDetailRequestDto) {

        // Tạo hoặc tải lên giỏ hàng cho người dùng
        Cart cart = cartRepository.findById(cartDetailRequestDto.getCartId()).orElse(null);

        // Tìm cartDetail hiện tại bằng productId và cartId
        Optional<CartDetail> existingCartDetail = cartDetailRepository.findByProductDetailIdAndCartId(
                cartDetailRequestDto.getProductDetailId(), cart.getId());

        if (existingCartDetail.isPresent()) {
            // Nếu cartDetail đã tồn tại, cập nhật số lượng
            CartDetail cartDetail = existingCartDetail.get();
            cartDetail.setQuantity(cartDetail.getQuantity() + cartDetailRequestDto.getQuantity());
            cartDetailRepository.save(cartDetail);
        } else {
            // Nếu cartDetail không tồn tại, tạo mới
            ProductDetail productDetail = productDetailRepository.findById(cartDetailRequestDto.getProductDetailId()).orElse(null);

            if (productDetail != null) {
                CartDetail newCartDetail = new CartDetail();
                newCartDetail.setProductDetail(productDetail);
                newCartDetail.setCart(cart);
                newCartDetail.setQuantity(cartDetailRequestDto.getQuantity());
                cartDetailRepository.save(newCartDetail);
            } else {
                throw new ResourceNotFoundException("Không tìm thấy id sản phẩm chi tiết này!");
            }
        }

        return true;
    }

    @Override
    public Boolean updateCartDetail(CartDetailRequestDto cartDetailRequestDto, Long id) {

        CartDetail cartDetail = cartDetailRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFoundException("Không tìm thấy id giỏ hàng chi tiết này!"));
        // Neu tim thay thi set cart detail va luu lai
        cartDetail.setQuantity(cartDetailRequestDto.getQuantity());

        cartDetailRepository.save(cartDetail);

        return true;
    }

    @Override
    public Boolean deleteCartDetail(Long id) {

        CartDetail cartDetail = cartDetailRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFoundException("Không tìm thấy id giỏ hàng chi tiết này!"));

        cartDetailRepository.deleteById(cartDetail.getId());

        return true;
    }

}
