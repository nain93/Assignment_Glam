import axios from 'axios';
import { baseURL } from '../../common';

export const getTodayRecommend = async () => {
  const res = await axios.get(baseURL + '/introduction');
  if (res) {
    return res.data;
  }
};

export const getMoreRecommend = async () => {
  const res = await axios.get(baseURL + '/introduction/additional');
  if (res) {
    return res.data;
  }
};

export const getAddMoreRecommend = async ({ url, method }: { url?: string, method?: 'get' }) => {
  const res = await axios({
    method,
    url: baseURL + url,
  });
  if (res) {
    return res.data;
  }
};

export const getCustomRecommend = async () => {
  const res = await axios.post(baseURL + '/introduction/custom');
  if (res) {
    return res.data;
  }
};
