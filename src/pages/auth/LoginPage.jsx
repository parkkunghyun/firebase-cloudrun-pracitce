import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebaseConfig';
// 
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }

  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleEmailLogin}>
        <input type="email" placeholder='email을 입력해주세요' value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder='password를 입력해주세요' value={password} onChange={e => setPassword(e.target.value)} />
        <button type='submit'>로그인</button>
      </form>
      {error && <p>{error}</p>}

      <button onClick={handleGoogleLogin}>구글로 로그인</button>
    </div>
  )
}

export default LoginPage