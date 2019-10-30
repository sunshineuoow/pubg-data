export enum Platform {
  Steam = 'stream',
  Tournament = 'tournament',
  Kakao = 'kakao',
  Xbox = 'xbox',
  Psn = 'psn',
}

export const platforms = [
  Platform.Steam,
  Platform.Tournament,
  Platform.Kakao,
  Platform.Xbox,
  Platform.Psn,
];

export enum GameMode {
  duo = 'duo',
  duoFpp = 'duo-fpp',
  solo = 'solo',
  soloFpp = 'solo-fpp',
  squad = 'squad',
  squadFpp = 'squad-fpp',
  conquestDuo = 'conquest-duo',
  conquestDuoFpp = 'conquest-duo-fpp',
  conquestSolo = 'conquest-solo',
  conquestSoloFpp = 'conquest-solo-fpp',
  conquestSquad = 'conquest-squad',
  conquestSquadFpp = 'conquest-squad-fpp',
  esportsDuo = 'esports-duo',
  esportsDuoFpp = 'esports-duo-fpp',
  esportsSolo = 'esports-solo',
  esportsSoleFpp = 'esports-solo-fpp',
  esportsSquad = 'esports-squad',
  esportsSquadFpp = 'esports-squad-fpp',
  normalDuo = 'normal-duo',
  normalDuoFpp = 'normal-duo-fpp',
  normalSolo = 'normal-solo',
  normalSoloFpp = 'normal-solo-fpp',
  normalSquad = 'normal-squad',
  normalSquadFpp = 'normal-squad-fpp',
  warDuo = 'war-duo',
  warDuoFpp = 'war-duo-fpp',
  warSolo = 'war-solo',
  warSoloFpp = 'war-solo-fpp',
  warSquad = 'war-squad',
  warSquadFpp = 'war-squad-fpp',
  zombieDuo = 'zombie-duo',
  zombieDuoFpp = 'zombie-duo-fpp',
  zombieSolo = 'zombie-solo',
  zombieSoloFpp = 'zombie-solo-fpp',
  zombieSquad = 'zombie-squad',
  zombieSquadFpp = 'zombie-squad-fpp',
}

export enum GameMap {
  DesertMain = 'Desert_Main',
  ErangelMain = 'Erangel_Main',
  SavageMain = 'Savage_Main',
  RangeMain = 'Range_Main',
  DihorOtokMain = 'DihorOtok_Main',
  BalticMain = 'Baltic_Main',
}

export enum GameSeasonState {
  closed = 'closed',
  prepare = 'prepare',
  progress = 'progress',
}

export enum GameDeathType {
  Alive = 'alive', // 存活
  ByPlayer = 'byplayer', // 玩家击杀
  ByZone = 'byzone', // 安全区击杀
  Suicide = 'suicide', // 自杀
  Logout = 'logout', // 退出
}

export enum GameObjectType {
  Asset = 'asset',
  Roster = 'roster',
  Participant = 'participant'
}

export interface GameAssets {
  type: GameObjectType.Asset;
  id: string;
}

export interface GameRoster {
  type: GameObjectType.Roster;
  id: string; // 用于在included数组内寻找完整的队伍信息
}

export interface GameParticipant {
  type: GameObjectType.Participant;
  id: string; // 用于在included内寻找完整的玩家信息
}

export type GameAssetObject = GameAssets & {
  attributes: {
    URL: string; // telemetry.json的链接
    createAt: string; // 创建时间
    description: string; // 描述
    name: 'telemetry';
  };
};

export type GameParticipantObject = GameParticipant & {
  attributes: {
    actor: string;
    shardId: Platform;
    /**
     * 比赛中的玩家状态
     */
    stats: {
      DBNOs: number; // 击倒数
      assists: number; // 助攻数
      boosts: number; // 能量道具使用数
      damageDealt: number; // 造成伤害
      deathType: GameDeathType; // 死亡类型
      headshotKills: number; // 爆头击杀数
      heals: number; // 治疗道具使用
      killPlace: number; // 击杀排名
      killStreaks: number; // 死亡前击杀数
      kills: number; // 击杀数
      longestKill: number;
      name: string; // 游戏名
      playerId: string; // 玩家id
      revives: number; // 拯救队友数
      rideDistance: number; // 载具行驶距离
      roadKills: number; // 载具击杀
      swimDistance: number; // 游泳距离
      teamKills: number; // 击杀队友数
      timeSurvived: number; // 存活时间(s)
      vehicleDestroys: number; // 摧毁载具数
      walkDistance: number; // 步行距离
      weaponsAcquired: number; // 拾取武器数
      winPlace: number; // 胜利排名
    };
  };
};

export type GameRosterObject = GameRoster & {
  attributes: {
    shardId: Platform;
    stats: {
      rank: number; // 排名
      teamId: number; // 队伍id
    };
    won: 'false' | 'true'; // 是否赢得比赛
  };
  relationships: {
    participants: {
      data: GameParticipant[];
    };
    team: {
      data: null;
    };
  };
};

export type gameIncludedObject =
  | GameAssetObject
  | GameParticipantObject
  | GameRosterObject;

export interface PubgLink {
  schema?: string;
  self: string;
}

export interface PubgData {
  data: {
    type: 'match'; // 数据类型
    id: string; // 游戏id
    attributes: {
      createdAt: string; // 创建时间
      duration: number; // 时长(单位为s)
      gameMode: GameMode; // 比赛类型
      mapName: GameMap; // 地图名称
      isCustomMatch: boolean; // 是否为自定义比赛
      seasonState: GameSeasonState; // 赛季状态
      shardId: Platform; // 平台
      titleId: string; // 录像和游戏的标题
      stats: null;
      tags: null;
      patchVersion?: string;
    };
    relationships: {
      assets: {
        data: GameAssets[];
      };
      rosters: {
        data: GameRoster[];
      };
      rounds: null;
      spectators: null;
    }; // 队伍关系
    links: PubgLink;
  };
  included: gameIncludedObject[];
  links: PubgLink;
  meta: {};
}

export interface PubgTableData {
  id: string;
  name: string;
  winPlace: number;
  killPlace: number;
  kills: number;
  damageDealt: number;
  DBNOs: number;
  deathType: GameDeathType;
  revives: number;
  teamKills: number;
  longestKill: number;
  weaponsAcquired: number;
  distance: number;
}