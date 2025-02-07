import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import News from './News';
import Movies from './Movies';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';  //引入Ant Design的全局样式

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/news">百度新闻</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/movies">豆瓣电影</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '16px' }}>
          <Routes>
            <Route path="/news" element={<News />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
