import axios, { AxiosInstance } from 'axios';

import { configLoader } from '../../base';

export function client (bearerToken? : string) : AxiosInstance {
  return axios.create({
    baseURL: `http://127.0.0.1:${process.env.PORT || configLoader.get('environment.port')}`,
    timeout: 1000,
    headers: {
      Authorization: bearerToken || ''
    }
  });
}