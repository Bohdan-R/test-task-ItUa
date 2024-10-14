import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

type Token = {
  exp: number;
  iat: number;
  isActive: boolean;
  login: string;
  object: string;
  roles: [string];
};

const setToken = (token: string) => {
  Cookies.set('token', token);
};

const getToken = () => Cookies.get('token');

const isTokenExpired = (token: string) => {
  const decoded: Token = jwtDecode(token);
  if (!decoded) return true;

  return decoded.exp < Date.now() / 1000;
};

const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
};

const logout = () => {
  Cookies.remove('token');
};

export default {
  setToken,
  getToken,
  isTokenExpired,
  isLoggedIn,
  logout,
};
