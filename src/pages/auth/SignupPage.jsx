import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, signUpWithEmail } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (password !== checkPassword) {
        setError("비밀번호를 다시 입력해주세요");
      } else {
        await signUpWithEmail(email, password);
        navigate("/login");
      }
    } catch (e) {
      setError(e.message);
    }
  }


  return (
    <div>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder='email을 입력해주세요' value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder='password를 입력해주세요' value={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder='password를 한번 더 입력해주세요' value={checkPassword} onChange={e => setCheckPassword(e.target.value)} />
        <button type='submit' onClick={handleSignup}>회원가입</button>
      </form>
    </div>
  )
}

export default SignupPage