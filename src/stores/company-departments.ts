import { makeAutoObservable, runInAction } from 'mobx';
import API from '../api';
import { SanitizedDepartment, Department } from '../helpers/types';

type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

function getDepartmentsTree(items: SanitizedDepartment[]): Department[] {
  const departmentsMap = new Map<string, Department>();

  items.forEach(item => {
    const { title, chief } = item;
    departmentsMap.set(title, {
      key: '',
      title,
      chief,
      children: [],
    });
  });

  const departmentsTree: Department[] = [];

  items.forEach(item => {
    const { title, parent } = item;
    const node = departmentsMap.get(title);

    if (parent === null) {
      node!.key = (departmentsTree.length + 1).toString();
      departmentsTree.push(node!);
    } else {
      const parentNode = departmentsMap.get(parent);
      node!.key = `${parentNode!.key}.${parentNode!.children.length + 1}`;
      parentNode?.children.push(node!);
    }
  });

  return departmentsTree;
}

class Departments {
  departments: Department[] = [];
  errorMessage = '';
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  resetErrorMessage = () => {
    this.errorMessage = '';
  };

  getDepartments = async () => {
    this.resetErrorMessage();
    runInAction(() => {
      this.isLoading = true;
    });

    try {
      const res = await API.departments.getDepartments();

      // eslint-disable-next-line
      const departments: SanitizedDepartment[] = res.data['hydra:member'].map((d: any) => ({
        title: d.title,
        chief: d?.chief?.fullName || '',
        parent: d?.parent?.title || null,
      }));

      const departmentsTree = getDepartmentsTree(departments);
      runInAction(() => {
        this.isLoading = false;
        this.departments = departmentsTree;
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

export default new Departments();
