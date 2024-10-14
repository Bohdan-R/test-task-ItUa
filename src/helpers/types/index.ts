export type EmployeesData = {
  key: number;
  email: string;
  name: string;
  lastName: string;
  position: string;
};

export type FiltersData = Omit<EmployeesData, 'key'>;

export type SanitizedDepartment = {
  title: string;
  chief: string;
  parent: string | null;
};

export type Department = {
  key: string;
  title: string;
  chief: string;
  children: Department[];
};
