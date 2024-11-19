import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, decreaseToCart, clearCart, setCart } from "../features/cartSlice";
import { useAuth } from '../context/AuthProvider';
import { getCartFromFirestore } from '../utils/userCart';

const CartPage = () => {
  const { user } = useAuth();
  const cart = useSelector((state) => state.cart.cart);  // Redux 상태에서 장바구니 아이템 가져오기
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);  // 장바구니 총 수량
  const totalPrice = useSelector((state) => state.cart.totalPrice);  // 장바구니 총 가격
  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          // Firestore에서 장바구니 데이터 가져오기
          const cartData = await getCartFromFirestore(user.uid);
          
          // 총 수량과 총 가격 계산
          const totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = cartData.reduce((total, item) => total + item.price * item.quantity, 0);
          
          // Redux 상태에 장바구니 데이터 저장
          dispatch(setCart({
            cart: cartData, 
            totalQuantity,
            totalPrice
          }));
        } catch (error) {
          console.error('장바구니 가져오기 실패:', error);
        }
      };
      fetchCart();
    }
  }, [user, dispatch]); // 사용자 정보(user)가 변경될 때마다 실행

  // 장바구니 비우기
  const handleClearCart = () => {
    if (user) {
      dispatch(clearCart());
    } else {
      alert('로그인 후 장바구니를 비울 수 있습니다.');
    }
  };

  // 아이템 삭제
  const handleRemoveFromCart = (id) => {
    if (user) {
      dispatch(removeFromCart({ id, userId: user.uid }));
    } else {
      alert('로그인 후 아이템을 삭제할 수 있습니다.');
    }
  };

  // 수량 감소
  const handleDecreaseQuantity = (id, price) => {
    if (user) {
      dispatch(decreaseToCart({ id, price, userId: user.uid }));
    } else {
      alert('로그인 후 수량을 변경할 수 있습니다.');
    }
  };

  // 수량 증가
  const handleIncreaseQuantity = (id, price) => {
    if (user) {
      dispatch(addToCart({ id, price, userId: user.uid }));
    } else {
      alert('로그인 후 수량을 변경할 수 있습니다.');
    }
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">장바구니</h1>

      {user ? (
        <h2 className="mb-4 text-xl">{user.displayName ? `${user.displayName}님의 장바구니` : `${user.email}님의 장바구니`}</h2>
      ) : (
        <h2 className="mb-4 text-xl">로그인 후 장바구니를 확인할 수 있습니다.</h2>
      )}

      {cart.length === 0 ? (
        <p className="text-center">장바구니에 아이템이 없습니다.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b">
                <img src={item.image} alt={item.name} className="object-cover w-20 h-20" />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>가격: {item.price}원</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id, item.price)}
                      className="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      수량 감소
                    </button>
                    <span className="mx-2">수량: {item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id, item.price)}
                      className="px-2 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      수량 증가
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="px-2 py-1 ml-8 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                    >
                      제거
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold">{item.price * item.quantity}원</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handleClearCart}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              장바구니 비우기
            </button>
            <div className="text-right">
              <p>총 수량: {totalQuantity}</p>
              <p className="text-xl font-bold">총 가격: {totalPrice}원</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
