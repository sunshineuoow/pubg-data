import React, { useState } from 'react';
import { Select, Input, Button, message } from 'antd';
import { Platform, platforms, PubgData } from './types/pubg.interface';
import './App.scss';
import { getData } from './service/axios';

// a6675d04-e700-4c60-88b2-be3a3622305a

const handleMatchData = (matchData: PubgData) => {
  return matchData;
};

const App: React.FC = () => {
  const [platform, setPlatform] = useState(platforms[0]);
  const [gameId, setGameId] = useState('a6675d04-e700-4c60-88b2-be3a3622305a');
  const [gameData, setGameData] = useState();

  function getGameData() {
    if (!platform || !gameId) {
      message.error('服务器或者比赛id缺失');
    }

    getData(platform, gameId).then(data => {
      setGameData(handleMatchData(data));
    });
  }

  return (
    <div className="App">
      <header>
        <div className="btn-group">
          <p>请选择服务器</p>
          <Select
            style={{ width: 120 }}
            value={platform}
            onChange={(v: Platform) => setPlatform(v)}
          >
            {platforms.map(platform => (
              <Select.Option key={platform} value={platform}>
                {platform}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="input">
          <Input
            value={gameId}
            onChange={e => setGameId(e.target.value)}
            placeholder="请输入比赛id"
          />
        </div>
        <Button type="primary" onClick={getGameData}>
          查询数据
        </Button>
      </header>

      <section>{JSON.stringify(gameData)}</section>
    </div>
  );
};

export default App;
