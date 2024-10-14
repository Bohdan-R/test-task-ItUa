import axios from 'axios';
import AuthService from '../services/authService';
import { FiltersData } from '../helpers/types';

const BASE_URL = 'https://demo2-uk.prod.itua.in.ua/core_api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

if (AuthService.isLoggedIn()) {
  api.defaults.headers.common['Authorization'] = `Bearer ${AuthService.getToken()}`;
}

export default {
  user: {
    signIn: (login: string, password: string) =>
      api.post('/auth/login', { login, password }).then(res => {
        if (res?.data?.token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        }
        return res;
      }),
    signOut: () => delete api.defaults.headers.common['Authorization'],
  },
  employees: {
    getEmployees: (filters: FiltersData) => {
      return api.get('/company/users', {
        headers: {
          Accept: 'application/ld+json',
        },
        params: {
          email: filters.email,
          name: filters.name,
          lastName: filters.lastName,
          position: filters.position,
        },
      });
    },
  },
  departments: {
    getDepartments: () => {
      return api.get('/company/departments', {
        headers: {
          Accept: 'application/ld+json',
        },
      });
    },
  },
};
