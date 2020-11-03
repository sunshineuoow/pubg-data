import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header>pubg查询小工具</header>
      <div className="btn-group">
        <Button>
          <Link to="match">根据比赛id搜索</Link>
        </Button>
        <Button>
          <Link to="user">根据用户名搜索</Link>
        </Button>
      </div>
      <footer>
        <p>by 灰机</p>
      </footer>
    </div>
  );
};

export default HomePage;
