import './index.scss';
import React from 'react';
import { PubgMatchData } from '../../types/pubg.interface';
import { getMapName, isParticipant, isSoloGame } from '../../utils';
import dayjs from 'dayjs';

const MatchInfo = ({
  username,
  match,
  onClick,
}: {
  username: string;
  match: PubgMatchData;
  onClick: (match: PubgMatchData) => void;
}) => {
  const {
    included,
    data: {
      id,
      attributes: { gameMode, createdAt, mapName, duration },
    },
  } = match;
  const userData = included
    .filter(isParticipant)
    .find((item) => item.attributes.stats.name === username);
  const {
    attributes: { stats },
  } = userData!;
  const {
    kills,
    assists,
    winPlace,
    timeSurvived,
    damageDealt,
    longestKill,
    walkDistance,
    swimDistance,
    rideDistance,
    DBNOs,
    heals,
    boosts,
  } = stats;
  const survivedMinutes = Math.floor(timeSurvived / 60);
  const survivedSeconds = Math.floor(timeSurvived % 60);
  const percent = (timeSurvived / duration) * 100;
  const travelDistance = walkDistance + swimDistance + rideDistance;

  return (
    <div className="match-info" onClick={() => onClick(match)}>
      <div
        className={`match-info-header 
        ${winPlace <= 10 ? 'topTen' : ''} 
        ${winPlace === 1 ? 'champion' : ''}`}
      >
        <p className="mode">{gameMode.toUpperCase()}</p>
        <p className="date">{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <div className={`match-info-map ${getMapName(mapName)}`}>
        {getMapName(mapName)}
      </div>
      <div
        className={`match-info-place 
        ${isSoloGame(gameMode) ? 'solo-game' : ''}
        ${winPlace <= 10 ? 'topTen' : ''} 
        ${winPlace === 1 ? 'champion' : ''}`}
      >
        <div>
          <h5>Place</h5>
          <p>{winPlace}</p>
        </div>
        <div>
          <h5>Kill</h5>
          <p>{kills}</p>
        </div>
        {!isSoloGame(gameMode) ? (
          <div>
            <h5>Assists</h5>
            <p>{assists}</p>
          </div>
        ) : null}
      </div>
      <div className="match-info-alive">
        <h4>Time Alive</h4>
        <div className="match-info-alive__container">
          <span
            style={{
              width: `${percent}%`,
            }}
          >
            {`${survivedMinutes < 10 ? '0' : ''}${survivedMinutes}`}:
            {`${survivedSeconds < 10 ? '0' : ''}${survivedSeconds}`}
          </span>
        </div>
      </div>
      <div className="match-info-detail">
        <p>
          Damage <span>{damageDealt.toFixed(0)}</span>
        </p>
        <p>
          Longest Kill <span>{longestKill.toFixed(2)}</span> meters
        </p>
        <p>
          Travel Distance <span>{travelDistance.toFixed(2)}</span> meters
        </p>
        <p>
          Knocks <span>{DBNOs}</span>
        </p>
        <p>
          Heals <span>{heals}</span>
        </p>
        <p>
          Boosts <span>{boosts}</span>
        </p>
      </div>
      <div className="match-info-footer">{id}</div>
    </div>
  );
};

export default MatchInfo;
