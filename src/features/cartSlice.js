import { createSlice } from '@reduxjs/toolkit';
import { saveCartToFirestore } from '../utils/userCart';

// 초기 상태 정의
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,  // 초기 상태 설정
    reducers: {
        setCart: (state, action) => {
            // action.payload는 서버에서 가져온 장바구니 데이터입니다.
            const { cart, totalQuantity, totalPrice } = action.payload;
            state.cart = cart;
            state.totalQuantity = totalQuantity;
            state.totalPrice = totalPrice;
          },
    addToCart: (state, action) => {
      const itemExists = state.cart.find(item => item.id === action.payload.id);  // state.cart에서 찾기
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;

      // Firestore에 장바구니 정보 저장
      if (action.payload.userId) {
        saveCartToFirestore(action.payload.userId, state.cart);
      } else {
        console.error('User ID is required to save the cart to Firestore.');
      }
    },
    decreaseToCart: (state, action) => {
      const itemExists = state.cart.find(item => item.id === action.payload.id);  // state.cart에서 찾기
      if (itemExists) {
        if (itemExists.quantity > 1) {
          itemExists.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= itemExists.price;  // 기존 아이템의 가격만큼 총 가격에서 감소
        } else {
          // 수량이 1개일 경우 아이템을 장바구니에서 제거
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
          state.totalQuantity -= 1;
          state.totalPrice -= itemExists.price;
        }
      }
      
      // Firestore에 장바구니 정보 저장
      if (action.payload.userId) {
        saveCartToFirestore(action.payload.userId, state.cart);
      } else {
        console.error('User ID is required to save the cart to Firestore.');
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);  // state.cart에서 찾기
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.quantity * existingItem.price;
        state.cart = state.cart.filter(item => item.id !== action.payload.id);  // 해당 아이템 제거
      }

      // Firestore에 장바구니 정보 저장
      if (action.payload.userId) {
        saveCartToFirestore(action.payload.userId, state.cart);
      } else {
        console.error('User ID is required to save the cart to Firestore.');
      }
    },
    clearCart: () => {
      return {  // 장바구니를 비우는 액션
        cart: [],
        totalQuantity: 0,
        totalPrice: 0
      };
    },
  },
});

export const { clearCart, setCart, addToCart, decreaseToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
