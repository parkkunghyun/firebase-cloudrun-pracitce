import React, { useEffect, useMemo, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ChairList from '../components/ChairList';
import { CiSearch } from "react-icons/ci";

// firebase내에 데이터들이 보이게!
const MainPage = () => {
  const [chairs, setChairs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const dataSnapShot = await getDocs(collection(db, 'chairs'));
      const data = dataSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChairs(data);
    } catch (e) {
      console.error(e.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filterChairs = useMemo(() => {
    return chairs.filter(chair =>
      chair.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [chairs, search]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <h1 className='text-2xl font-bold'>의자 정보를 가져오는 중입니다...</h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center w-full gap-4'>
      <h1 className='text-4xl font-bold'>Chair List</h1>
      <div className='flex items-center px-4 py-2 border-2 rounded-full focus:shadow-md'>
        <input className='flex-1 text-gray-600 focus:outline-none' value={search} onChange={e => setSearch(e.target.value)}
          type="text" placeholder='의자명을 검색하세요' />
        <CiSearch className='cursor-pointer'/>
      </div>
      <ChairList chairs={filterChairs} />
    </div>
  )
}

export default MainPage