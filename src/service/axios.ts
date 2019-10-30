import axios from 'axios';
import { Platform, PubgData } from '../types/pubg.interface';

const BASE_URl = 'https://api.pubg.com/shards';

const axiosInstance = axios.create({
  headers: {
    accept: 'application/vnd.api+json',
  },
});

export const getData = (platform: Platform, gameId: string) => {
  const url = `${BASE_URl}/${platform}/matches/${gameId}`;
  return axiosInstance.get<PubgData>(url).then(resp => resp.data);
};
