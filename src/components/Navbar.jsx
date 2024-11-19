import React from 'react';
import { Link } from 'react-router-dom';
import chairIcon from "../images/chair-icon.png";
import { FaUserCircle } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { useAuth } from '../context/AuthProvider'; // 인증 context 가져오기
import { auth } from '../firebaseConfig';

const Navbar = () => {
  const { user, loading } = useAuth(); // user와 loading 가져오기

  const handleLogout = () => {
    auth.signOut();  // 로그아웃 처리
    alert("로그아웃 되었습니다.");
  };

  if (loading) return <div>Loading...</div>;  // 로딩 중에는 대기 화면을 보여줄 수 있음

  return (
    <nav className='flex items-center justify-between p-4'>
      <Link to="/"> 
        <img src={chairIcon} alt="chair" className='w-16 rounded-full shadow-lg'/>
      </Link>
     
      <div className='flex items-center justify-between gap-4 mr-4'>
        {user ? (
          <>
            <FaUserCircle className='text-xl '/>
            {/* 사용자 정보에서 displayName 또는 email을 출력 */}
            <span className='text-sm '>{user.displayName || user.email}</span> 
            <button 
              className='p-2 text-sm text-black bg-white rounded-lg hover:scale-105' 
              onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link className='text-sm hover:scale-105' to="/login">로그인</Link>
            <p className='text-gray-300'>|</p>
            <Link className='text-sm hover:scale-105' to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
