package com.poly.springboot.service.impl;

import com.poly.springboot.dto.requestDto.CartRequestDto;
import com.poly.springboot.dto.responseDto.CartDetailResponseDto;
import com.poly.springboot.entity.*;
import com.poly.springboot.exception.ResourceNotFoundException;
import com.poly.springboot.repository.*;
import com.poly.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    private CartDetailRepository cartDetailRepository;

    private ProductDetailRepository productDetailRepository;

    private CartRepository cartRepository;

    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    public CartServiceImpl(CartDetailRepository cartDetailRepository,
                                 ProductDetailRepository productDetailRepository,
                                 CartRepository cartRepository,
                                 UserRepository userRepository
                                ){
        this.cartDetailRepository = cartDetailRepository;
        this.productDetailRepository = productDetailRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Boolean createCart(CartRequestDto cartRequestDto) {

        ProductDetail productDetails = productDetailRepository.findById(cartRequestDto.getProductDetailId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm chi tiết này!"));

        Product product = this.productRepository.findById(productDetails.getProduct().getId()).get();

        if (productDetails.getDeleted() == false || product.getDeleted() == false) {
            throw new ResourceNotFoundException("Sản phẩm này đã bị xóa!");

        } else {
            User user = userRepository.findById(cartRequestDto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại!"));

            Optional<Cart> existingCart = cartRepository.findByUserId(cartRequestDto.getUserId());

            Cart cart = existingCart.orElseGet(() -> {
                Cart newCart = new Cart();
                newCart.setUser(user);
                return cartRepository.save(newCart);
            });
            Optional<CartDetail> existingCartDetail = cartDetailRepository.findByProductDetailIdAndCartsId(
                    cartRequestDto.getProductDetailId(), cart.getId());

            ProductDetail productDetail = productDetailRepository.findById(cartRequestDto.getProductDetailId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy id sản phẩm chi tiết này!"));

            if (existingCartDetail.isPresent()) {
                // Nếu cartDetail đã tồn tại, cập nhật số lượng
                CartDetail cartDetail = existingCartDetail.get();

                // Check if the total quantity in the cart after adding is greater than the available quantity
                if (productDetail.getQuantity() < cartDetail.getQuantity() + cartRequestDto.getQuantity()) {
                    throw new ResourceNotFoundException("Số lượng sản phẩm trong giỏ hàng vượt quá số lượng có sẵn!");
                }

                cartDetail.setQuantity(cartDetail.getQuantity() + cartRequestDto.getQuantity());
                cartDetailRepository.save(cartDetail);
            } else {
                // Nếu cartDetail không tồn tại, tạo mới

                // Check if the total quantity in the cart after adding is greater than the available quantity
                if (productDetail.getQuantity() < cartRequestDto.getQuantity()) {
                    throw new ResourceNotFoundException("Số lượng sản phẩm trong giỏ hàng vượt quá số lượng có sẵn!");
                }

                CartDetail newCartDetail = new CartDetail();
                newCartDetail.setProductDetail(productDetail);
                newCartDetail.setCarts(cart);
                newCartDetail.setQuantity(cartRequestDto.getQuantity());
                cartDetailRepository.save(newCartDetail);

            }
            return true;
        }
    }


    @Override
    public List<CartDetailResponseDto> getAllCartDetailByCartId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại!"));

        Optional<Cart> existingCart = cartRepository.findByUserId(user.getId());
        System.out.println(existingCart);

        return cartDetailRepository.getCartDetailInfo(existingCart.get().getId());
    }

    @Override
    public Cart findCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).orElse(null);
    }

    @Override
    public Boolean updateCartDetail(Integer quantity, Long id) {
        CartDetail cartDetail = cartDetailRepository.findById(id)
                .orElseThrow( ()-> new ResourceNotFoundException("Không tìm thấy id giỏ hàng chi tiết này!"));
        // Neu tim thay thi set cart detail va luu lai
        cartDetail.setQuantity(quantity);

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
