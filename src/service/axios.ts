import axios from 'axios';
import { Platform, PubgMatchData, PubgUserData } from '../types/pubg.interface';

const BASE_URL = 'https://api.pubg.com/shards';
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4Zjg0NzVjMC1mZjFkLTAxMzgtZjVlMi0wMzFiZjA2YTVjZjciLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjA0MzEwMTEyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImEtcHViZy10b29sIn0.7EyTTD6oA0Vci-m91H1zbNLKZ79F861o9h3RIo9BeDs';

const axiosInstance = axios.create({
  headers: {
    accept: 'application/vnd.api+json',
  },
});

export const getMatchData = (platform: Platform, gameId: string) => {
  const url = `${BASE_URL}/${platform}/matches/${gameId}`;
  return axiosInstance.get<PubgMatchData>(url).then(
    (resp) => resp.data,
    (error) => Promise.reject(error)
  );
};

export const getUserMatches = (platform: Platform, username: string) => {
  const url = `${BASE_URL}/${platform}/players`;
  return axiosInstance
    .get<PubgUserData>(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        'filter[playerNames]': username,
      },
    })
    .then(
      (resp) => resp.data,
      (error) => Promise.reject(error)
    );
};
