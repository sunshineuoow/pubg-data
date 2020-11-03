import React, { useState } from 'react';
import { message } from 'antd';
import SearchHeader from '../../components/SearchHeader';
import MatchDetail from '../../components/MatchDetail';
import { Platform, PubgMatchData } from '../../types/pubg.interface';
import { getMatchData } from '../../service/axios';
import './index.scss';

const MatchPage: React.FC = () => {
  const [gameData, setGameData] = useState<PubgMatchData>();

  function getGameData(platform: Platform, gameId: string) {
    if (!platform || !gameId) {
      message.error('服务器或者比赛id缺失');
      return;
    }

    getMatchData(platform, gameId).then((data) => {
      setGameData(data);
    });
  }

  return (
    <div className="match-page">
      <SearchHeader onSearch={getGameData} placeholder="请输入比赛id" />
      <div className="content">
        {gameData ? <MatchDetail match={gameData} /> : null}
      </div>
    </div>
  );
};

export default MatchPage;
