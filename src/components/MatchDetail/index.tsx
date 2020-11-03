import React, { useEffect } from 'react';
import { Table } from 'antd';
import { PubgMatchData, PubgTableData } from '../../types/pubg.interface';
import { handleMatchData } from '../../utils';
import { TableExport } from 'tableexport';
import './index.scss';

let table: TableExport;

const MatchDetail = ({ match }: { match: PubgMatchData }) => {
  const gameData = handleMatchData(match);

  useEffect(() => {
    const tableELe = document.getElementsByTagName('table')[0];

    if (table) {
      table.reset();
      table.remove();
      table.update({
        filename: match.data.id,
        bootstrap: true,
        exportButtons: true,
        position: 'top',
      });
    } else {
      table = new TableExport(tableELe, {
        headers: true,
        footers: true,
        formats: ['xlsx', 'csv', 'txt'],
        filename: match.data.id,
        bootstrap: true,
        exportButtons: true,
        position: 'top',
        trimWhitespace: true,
        RTL: false,
      });
    }
  });

  return (
    <section className="match-detail">
      <Table<PubgTableData>
        dataSource={gameData}
        rowKey="id"
        pagination={false}
      >
        <Table.Column<PubgTableData> key="name" title="Name" dataIndex="name" />
        <Table.Column<PubgTableData>
          key="winPlace"
          title="Win Place"
          dataIndex="winPlace"
        />
        <Table.Column<PubgTableData>
          key="killPlace"
          title="Kill Place"
          dataIndex="killPlace"
        />
        <Table.Column<PubgTableData>
          key="kills"
          title="Kills"
          dataIndex="kills"
        />
        <Table.Column<PubgTableData>
          key="damageDealt"
          title="Damage Dealt"
          dataIndex="damageDealt"
        />
        <Table.Column<PubgTableData>
          key="revives"
          title="Revives"
          dataIndex="revives"
        />
        <Table.Column<PubgTableData>
          key="teamKills"
          title="Team Kills"
          dataIndex="teamKills"
        />
        <Table.Column<PubgTableData>
          key="longestKill"
          title="Longest Kill"
          dataIndex="longestKill"
        />
        <Table.Column<PubgTableData>
          key="weaponsAcquired"
          title="Weapons Acquired"
          dataIndex="weaponsAcquired"
        />
        <Table.Column<PubgTableData>
          key="distance"
          title="Distance Travel"
          dataIndex="distance"
        />
      </Table>
    </section>
  );
};

export default MatchDetail;
