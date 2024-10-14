import { makeAutoObservable, runInAction } from 'mobx';
import API from '../api';
import { EmployeesData, FiltersData } from '../helpers/types';

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

class Employees {
  employees: EmployeesData[] = [];
  errorMessage = '';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  resetErrorMessage = () => {
    this.errorMessage = '';
  };

  getUsers = async (filters: FiltersData) => {
    this.resetErrorMessage();
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const res = await API.employees.getEmployees(filters);

      runInAction(() => {
        this.isLoading = false;
        this.employees = res.data['hydra:member'].map((item: Omit<EmployeesData, 'key'>, index: number) => ({
          key: index + 1,
          email: item.email,
          name: item.name,
          lastName: item.lastName,
          position: item.position,
        }));
      });
    } catch (error: unknown) {
      runInAction(() => {
        const apiError = error as ApiError;

        if (apiError.response && apiError.response.data && apiError.response.data.message) {
          this.errorMessage = apiError.response.data.message;
        } else {
          this.errorMessage = 'Упс, щось пішло не так, спробуйте ще раз.';
        }

        this.isLoading = false;
      });
    }
  };
}

export default new Employees();
