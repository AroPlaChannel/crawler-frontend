import React from 'react';
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
        <a href="/news">百度新闻</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/movies">豆瓣电影</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="/recognize_digit">手写数字识别</a>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        退出
      </Menu.Item>
    </Menu>
  );
}

export default HeaderMenu;
