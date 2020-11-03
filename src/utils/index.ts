import {
  GameMap,
  GameMode,
  GameObjectType,
  PubgGameObject,
  PubgGameParticipant,
  PubgGameRoster,
  PubgMatchData,
} from '../types/pubg.interface';
import dayjs from 'dayjs';

export const convertData = (participant: PubgGameParticipant) => {
  const { attributes, id } = participant;
  const { stats } = attributes;
  const {
    name,
    winPlace,
    killPlace,
    kills,
    damageDealt,
    DBNOs,
    deathType,
    revives,
    teamKills,
    longestKill,
    weaponsAcquired,
    rideDistance,
    swimDistance,
    walkDistance,
  } = stats;
  const distance = rideDistance + swimDistance + walkDistance;

  return {
    id,
    name,
    winPlace,
    killPlace,
    kills,
    damageDealt,
    DBNOs,
    deathType,
    revives,
    teamKills,
    longestKill,
    weaponsAcquired,
    distance,
  };
};

export const handleMatchData = (matchData: PubgMatchData) => {
  const rosterArr: PubgGameRoster[] = [];
  const participantArr: PubgGameParticipant[] = [];
  const result: PubgGameParticipant[] = [];
  matchData.included.forEach((obj) => {
    if (obj.type === GameObjectType.Roster) {
      rosterArr.push(obj);
    } else if (obj.type === GameObjectType.Participant) {
      participantArr.push(obj);
    }
  });

  rosterArr.sort((a, b) =>
    a.attributes.stats.rank <= b.attributes.stats.rank ? -1 : 1
  );
  rosterArr.forEach((roster) => {
    const { data } = roster.relationships.participants;
    const idList = data.map((v) => v.id);
    const arr = participantArr.filter((v) => idList.includes(v.id));
    arr.sort((a, b) =>
      a.attributes.stats.killPlace <= b.attributes.stats.killPlace ? -1 : 1
    );
    result.push(...arr);
  });

  return result.map(convertData);
};

export function isParticipant(
  object: PubgGameObject
): object is PubgGameParticipant {
  return object.type === GameObjectType.Participant;
}

export const sortGame = (a: PubgMatchData, b: PubgMatchData) => {
  const aDate = dayjs(a.data.attributes.createdAt);
  const bDate = dayjs(b.data.attributes.createdAt);
  return Number(aDate.isBefore(bDate));
};

export const isSoloGame = (gameMode: GameMode) =>
  gameMode.indexOf('solo') !== -1;

export const getMapName = (gameMap: GameMap) => {
  switch (gameMap) {
    case GameMap.Baltic:
      return 'Erangel';
    case GameMap.Desert:
      return 'Miramar';
    case GameMap.DihorOtok:
      return 'Vikendi';
    case GameMap.SummerLand:
      return 'Karakin';
    case GameMap.Savage:
      return 'Sanhok';
    case GameMap.Range:
      return 'Training-Range';
    case GameMap.Chimera:
      return 'Paramo';
    case GameMap.Erangel:
      return '';
  }
};
