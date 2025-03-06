import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 登录成功后，不需要调用 navigate，这里依靠 useEffect 来监听 user 状态
    } catch (err) {
      setError(err.message);
    }
  };

  // 当检测到 user 存在（登录成功），跳转到 /news 页面
  useEffect(() => {
    if (user) {
      navigate("/news");
    }
  }, [user, navigate]);

  if (loading) return <div>加载中...</div>;

  return (
    <div>
      <h2>登录</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="邮箱"
        /><br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
        /><br />
        <button type="submit">登录</button>
      </form>
      <p>
        没有账号？<Link to="/register">立即注册</Link>
      </p>
    </div>
  );
}

export default Login;
