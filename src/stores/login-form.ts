import { makeAutoObservable, runInAction } from 'mobx';
import API from '../api';
import AuthService from '../services/authService';

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

class LoginForm {
  login = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLogin = (value: string) => {
    this.login = value;
  };
  resetLogin = () => {
    this.login = '';
  };

  setPassword = (value: string) => {
    this.password = value;
  };
  resetPassword = () => {
    this.password = '';
  };

  resetErrorMessage = () => {
    this.errorMessage = '';
  };

  signIn = async () => {
    this.resetErrorMessage();
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const res = await API.user.signIn(this.login, this.password);

      const token = res?.data?.token || null;
      if (token) {
        AuthService.setToken(token);
      }
      runInAction(() => {
        this.isLoading = false;
      });
      return res;
    } catch (error: unknown) {
      runInAction(() => {
        const apiError = error as ApiError;

        console.log('apiError: ', apiError);

        if (apiError.response && apiError.response.data && apiError.response.data.message) {
          this.errorMessage = apiError.response.data.message;
        } else {
          this.errorMessage = 'Помилка при вході, спробуйте ще раз.';
        }

        this.isLoading = false;
      });
    }
  };
}

export default new LoginForm();
