import React, {useState} from 'react';
import {Button, Input, message, Select, Table} from 'antd';
import {
  GameObjectType,
  GameParticipantObject,
  GameRosterObject,
  Platform,
  platforms,
  PubgData,
  PubgTableData
} from './types/pubg.interface';
import {getData} from './service/axios';
import { TableExport } from 'tableexport';
import './App.scss';


// a6675d04-e700-4c60-88b2-be3a3622305a

const convertData = (participant: GameParticipantObject) => {
  const { attributes, id } = participant;
  const { stats } = attributes;
  const { name, winPlace, killPlace, kills, damageDealt, DBNOs, deathType, revives, teamKills, longestKill, weaponsAcquired, rideDistance, swimDistance, walkDistance } = stats;
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
    distance
  }
};

const handleMatchData = (matchData: PubgData) => {
  const rosterArr: GameRosterObject[] = [];
  const participantArr: GameParticipantObject[] = [];
  const result: GameParticipantObject[] = [];
  matchData.included.forEach(obj => {
    if (obj.type === GameObjectType.Roster) {
      rosterArr.push(obj)
    } else if (obj.type === GameObjectType.Participant) {
      participantArr.push(obj)
    }
  });

  rosterArr.sort((a, b) => (a.attributes.stats.rank <= b.attributes.stats.rank ? -1 : 1));
  rosterArr.forEach(roster => {
    const { data } = roster.relationships.participants;
    const idList = data.map(v => v.id);
    const arr = participantArr.filter(v => idList.includes(v.id));
    arr.sort((a, b) =>(a.attributes.stats.killPlace <= b.attributes.stats.killPlace ? -1 : 1));
    result.push(...arr);
  });

  return result.map(convertData);
};

let table: TableExport;

const App: React.FC = () => {
  const [platform, setPlatform] = useState(platforms[0]);
  const [gameId, setGameId] = useState('');
  const [gameData, setGameData] = useState();

  function getGameData() {
    if (!platform || !gameId) {
      message.error('服务器或者比赛id缺失');
    }

    getData(platform, gameId).then(data => {
      setGameData(handleMatchData(data));
      const tableELe = document.getElementsByTagName("table")[0];

      if (table) {
        table.reset();
        table.remove();
        table.update({
          filename: gameId,
          bootstrap: true,
          exportButtons: true,
          position: "top",
        })
      } else {
        table = new TableExport(tableELe, {
          headers: true,
          footers: true,
          formats: ["xlsx", "csv", "txt"],
          filename: gameId,
          bootstrap: true,
          exportButtons: true,
          position: "top",
          trimWhitespace: true,
          RTL: false
        });
      }
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

      <section>
        <Table<PubgTableData> dataSource={gameData} rowKey="id" pagination={false}>
          <Table.Column<PubgTableData> key="name" title="Name" dataIndex="name" />
          <Table.Column<PubgTableData> key="winPlace" title="Win Place" dataIndex="winPlace" />
          <Table.Column<PubgTableData> key="killPlace" title="Kill Place" dataIndex="killPlace" />
          <Table.Column<PubgTableData> key="kills" title="Kills" dataIndex="kills" />
          <Table.Column<PubgTableData> key="damageDealt" title="Damage Dealt" dataIndex="damageDealt" />
          <Table.Column<PubgTableData> key="revives" title="Revives" dataIndex="revives" />
          <Table.Column<PubgTableData> key="teamKills" title="Team Kills" dataIndex="teamKills" />
          <Table.Column<PubgTableData> key="longestKill" title="Longest Kill" dataIndex="longestKill" />
          <Table.Column<PubgTableData> key="weaponsAcquired" title="Weapons Acquired" dataIndex="weaponsAcquired" />
          <Table.Column<PubgTableData> key="distance" title="Distance Travel" dataIndex="distance" />
        </Table>
      </section>
    </div>
  );
};

export default App;
