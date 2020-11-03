import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import MatchDetail from '../../components/MatchDetail';
import { RouteComponentProps } from 'react-router';
import { getMatchData } from '../../service/axios';
import { Platform, PubgMatchData } from '../../types/pubg.interface';
import './index.scss';

interface RouteProps {
  platform: Platform;
  id: string;
}

const MatchDetailPage = (props: RouteComponentProps<RouteProps>) => {
  const [matchData, setMatchData] = useState<PubgMatchData>();
  const { platform, id } = props.match.params;

  useEffect(() => {
    getMatchData(platform, id).then((data) => {
      setMatchData(data);
    });
  }, [id, platform]);

  return (
    <div className="match-detail-page">
      <Button type="primary">
        <Link to="/">返回首页</Link>
      </Button>
      <h4>matchId {id}</h4>
      {matchData ? <MatchDetail match={matchData} /> : null}
    </div>
  );
};

export default MatchDetailPage;
