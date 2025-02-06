import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('https://crawler-backend-whl4.onrender.com/api/news')
      .then(response => {
        setNews(response.data.map((item, index) => ({ title: item, rank: index + 1 })));
      })
      .catch(error => {
        console.error("获取新闻时发生错误！", error);
      });
  }, []);

  return (
    <div>
      <Card title="百度新闻 Top 10">
        <ol>
          {news.map((item, index) => (
            <li key={index}> {item.title}</li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

export default News;
