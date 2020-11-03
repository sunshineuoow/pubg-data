import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { Platform, platforms } from '../../types/pubg.interface';
import './index.scss';

const SearchHeader = ({
  onSearch,
  placeholder,
}: {
  onSearch: (platform: Platform, value: string) => void;
  placeholder: string;
}) => {
  const [platform, setPlatform] = useState(platforms[0]);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="search-header">
      <Button type="primary">
        <Link to="/">返回首页</Link>
      </Button>
      <div className="btn-group">
        <p>请选择服务器</p>
        <Select
          style={{ width: 120 }}
          value={platform}
          onChange={(v: Platform) => setPlatform(v)}
        >
          {platforms.map((platform) => (
            <Select.Option key={platform} value={platform}>
              {platform}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="input">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      <Button type="primary" onClick={() => onSearch(platform, searchValue)}>
        查询数据
      </Button>
    </header>
  );
};

export default SearchHeader;
