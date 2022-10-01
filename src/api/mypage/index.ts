import axios from 'axios';
import { baseURL } from '../../common';

export const getProfile = async () => {
  const res = await axios.get(baseURL + '/profile');
  if (res) {
    return res.data;
  }
};
