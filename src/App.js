import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DetailPage from './pages/DetailPage';
import AiChatPage from './pages/AiChatPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen'>
        <Navbar />
        <Sidebar/>
        <div className='mt-10 ml-36'>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/chairs/:id' element={<DetailPage />} />
            <Route path='/ai' element={<AiChatPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/cart' element={<CartPage/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
