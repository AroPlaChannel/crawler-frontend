import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import News from './News';
import Movies from './Movies';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';  //引入Ant Design的全局样式

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <a href="/news">百度新闻</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/movies">豆瓣电影</a>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '16px' }}>
        <Router>
          <Routes>
            <Route path="/news" element={<News />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </Router>
      </Content>
    </Layout>
  );
}

export default App;
