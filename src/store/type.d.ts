/* eslint-disable no-unused-vars */
interface InfoProps {
  userId: string;
  username: string;
  phone: string;
  desc: string;
}

interface MenuProps {
  id: string;
  path: string;
  title: string;
}

/**@name 用户权限  拥有全部权限为超级管理员 [1,2,3]  */
type RolesProps = 1 | 2 | 3;

interface UserProps {
  username: string;
  fullname: string;
  password: string;
  phone: string;
  address: string;
  accountType: RolesProps[];
  token: string;
}

// 类型声明
export type StateProps = {
  /**@name userInformation */
  user: UserProps | null;
  /**@name datas */
  list: any[];
  /**@name loading */
  loading: boolean;
  /**@name edit */
  editItem: any;

  login: (val: any) => void;
  register: (val: any) => void;
  otp: (val: any) => void;
  setUser: (val: string) => void;
  setLoading: (val: boolean) => void;
  // 列表 增删改查
  getList: () => void;
  removeList: (id: string) => void;
  editList: (params: any) => void;
  addList: (params: any) => void;
  setEditItem: (params: any) => void;
};
