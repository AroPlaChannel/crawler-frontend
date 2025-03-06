import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from './firebaseConfig';

import News from './News';
import Movies from './Movies';
import NumberRecognizer from './NumberRecognizer';
import Register from './Register';
import Login from './Login';
import HeaderMenu from './HeaderMenu'

import { Layout } from 'antd';
import 'antd/dist/reset.css';  //引入Ant Design的全局样式

const { Header, Content } = Layout;

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>加载中...</div>;

  return (
    <Router>
      <Layout className="layout">
        {user && (
          <Header>
            <HeaderMenu />
          </Header>
        )}
        <Content style={{ padding: '0 50px', marginTop: '16px' }}>
          <Routes>
            {/* 根路径：如果已登录，重定向到新闻页面，否则显示登录页面 */}
            <Route path="/" element={user ? <Navigate to="/news" /> : <Login />} />
            <Route path="/login" element={user ? <Navigate to="/news" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/news" /> : <Register />} />

            {/* 受保护的路由，未登录状态下访问会重定向到根页面 */}
            <Route path="/news" element={user ? <News /> : <Navigate to="/" />} />
            <Route path="/movies" element={user ? <Movies /> : <Navigate to="/" />} />
            <Route path="/recognize_digit" element={user ? <NumberRecognizer /> : <Navigate to="/" />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
