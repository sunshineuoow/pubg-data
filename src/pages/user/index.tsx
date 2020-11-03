import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { message } from 'antd';
import SearchHeader from '../../components/SearchHeader';
import { Platform, PubgMatchData } from '../../types/pubg.interface';
import { getMatchData, getUserMatches } from '../../service/axios';
import './index.scss';
import MatchInfo from '../../components/MatchInfo';
import { sortGame } from '../../utils';

const UserPage = (props: RouteComponentProps) => {
  const [gameData, setGameData] = useState<PubgMatchData[]>([]);
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState(Platform.Steam);

  function getUserData(platform: Platform, username: string) {
    if (!platform || !username) {
      message.error('服务器或者用户名缺失');
      return;
    }

    setPlatform(platform);
    message.loading('正在加载数据中...', 60);

    getUserMatches(platform, username).then(
      (data) => {
        Promise.all(
          data.data[0].relationships.matches.data.map((match) =>
            getMatchData(platform, match.id)
          )
        ).then(
          (list) => {
            message.destroy();
            setUsername(username);
            setGameData(list.sort(sortGame));
          },
          (error) => {
            message.destroy();
            message.error('请求比赛数据出错');
          }
        );
      },
      (error) => {
        message.destroy();
        message.error('请求用户数据错误');
      }
    );
  }

  function goMatchDetailPage(match: PubgMatchData) {
    props.history.push(`/match/${platform}/${match.data.id}`);
  }

  return (
    <div className="user-page">
      <SearchHeader onSearch={getUserData} placeholder="请输入用户名" />
      <section>
        {gameData.map((match) => (
          <MatchInfo
            key={match.data.id}
            username={username}
            match={match}
            onClick={goMatchDetailPage}
          />
        ))}
      </section>
    </div>
  );
};

export default UserPage;
