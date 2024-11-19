import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthProvider';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  
  const [chair, setChair] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChair = async () => {
    try {
      setIsLoading(true);
      const chairDocRef = doc(db, 'chairs', id);
      const chairDoc = await getDoc(chairDocRef);
      setChair(chairDoc.data());
    } catch (E) {
      console.error(E);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchChair();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
        alert("로그인 후 이용 가능합니다.");
        return;
    }
    dispatch(addToCart({ ...chair, id, userId: user.uid }));
    alert('장바구니에 추가되었습니다.');
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <h1 class="bg-gradient-to-r mb-4 text-3xl font-extrabold from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            의자 정보를 가져오는 중입니다...
        </h1>
      </div>
    )
  }

  if (!chair) {
    return (
      <div className='flex flex-col items-center'>
        <h1 class="bg-gradient-to-r mb-4 text-3xl font-extrabold from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            의자를 찾을 수 없습니다.
        </h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center w-full gap-4'>
      <h1 className='text-2xl font-bold'>Chair Detail</h1>
      <div className='flex items-center justify-center w-[600px] h-[300px] gap-8 p-2 rounded-lg shadow-lg'>
        <img src={chair.image} className='mr-4 w-60' alt="chair" />
        <div className='flex flex-col gap-4'>
          <h1 class="bg-gradient-to-r mb-4 text-3xl font-extrabold from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            {chair.name}
          </h1>
          <p className='w-[200px]'>{chair.description}</p>
          <p className='mt-4 font-bold text-gray-500'>가격: {chair.price}</p>
        </div>
      </div>
      <div className='flex justify-between mt-4 w-[500px] gap-8'>
        <button className='w-1/2 p-4 text-lg font-bold text-white bg-black rounded-full shadow-lg hover:scale-105'>구매하기</button>
        <button
          onClick={handleAddToCart}
          className='w-1/2 p-2 text-lg font-bold border-2 rounded-full shadow-lg hover:scale-105'
        >장바구니 추가하기</button>
        </div>
    </div>
  )
}

export default DetailPage