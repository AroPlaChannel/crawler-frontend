import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { Menu } from 'antd';

function HeaderMenu() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('登出失败：', err);
    }
  };

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        <Link to="/news">百度新闻</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/movies">豆瓣电影</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/recognize_digit">手写数字识别</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        退出
      </Menu.Item>
    </Menu>
  );  
}

export default HeaderMenu;
