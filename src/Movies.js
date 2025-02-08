import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Menu, Card, Table } from 'antd';
import {
  BarChartOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const { Header, Content, Footer, Sider } = Layout;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [directorData, setDirectorData] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('table');

  useEffect(() => {
    axios.get('https://crawler-backend-whl4.onrender.com/api/movies')
      .then(response => {
        setMovies(response.data);
        processMovieData(response.data);
      })
      .catch(error => {
        console.error("获取电影时发生错误！", error);
      });
  }, []);

  const processMovieData = (movies) => {
    const countryCounts = {};
    const directorCounts = {};

    movies.forEach(movie => {
      // 拆分多国合拍的电影
      const countries = movie.countries.split(' ').map(country => country.trim());
      countries.forEach(country => {
        if (countryCounts[country]) {
          countryCounts[country]++;
        } else {
          countryCounts[country] = 1;
        }
      });

      const director = movie.director;
      if (directorCounts[director]) {
        directorCounts[director]++;
      } else {
        directorCounts[director] = 1;
      }
    });

    // 对国家成片数量数据进行排序
    const sortedCountryData = Object.keys(countryCounts)
      .map(country => ({
        name: country,
        count: countryCounts[country]
      }))
      .sort((a, b) => b.count - a.count);

    setCountryData(sortedCountryData);

    // 处理导演数据，排序并设置到状态
    const sortedDirectorData = Object.keys(directorCounts)
      .map(director => ({
        name: director,
        count: directorCounts[director]
      }))
      .sort((a, b) => b.count - a.count);

    setDirectorData(sortedDirectorData);
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: '电影名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '导演',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: '制片国家',
      dataIndex: 'countries',
      key: 'countries',
    },
  ];

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'table':
        return (
          <Card title="电影列表">
            <Table dataSource={movies} columns={columns} rowKey="title" pagination={false} />
          </Card>
        );
      case 'countryChart':
        return (
          <Card title="成片数量 vs 制片国家" style={{ marginTop: 20 }}>
            <BarChart width={600} height={800} data={countryData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" interval={0} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Card>
        );
      case 'directorChart':
        return (
          <Card title="上榜数量 vs 电影导演" style={{ marginTop: 20 }}>
            <BarChart width={1000} height={1400} data={directorData} layout="vertical" margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" interval={0} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </Card>
        );
      default:
        return null;
    }
  };

  const handleMenuClick = e => {
    setSelectedMenuItem(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200}>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onClick={handleMenuClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="table" icon={<TableOutlined />}>
            电影列表
          </Menu.Item>
          <Menu.Item key="countryChart" icon={<BarChartOutlined />}>
            国家统计图表
          </Menu.Item>
          <Menu.Item key="directorChart" icon={<BarChartOutlined />}>
            导演统计图表
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h1 style={{ marginLeft: 20 }}>豆瓣电影分析</h1>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {renderContent()}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2023 Created by Your Name
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Movies;
