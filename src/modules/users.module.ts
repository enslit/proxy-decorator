import {Api, IUser, IUsersModule} from "../types";
import {operationIdStorage} from "../utils";

export const usersModule = (api: Api): IUsersModule => {
  let users: IUser[] = [];

  return {
    getUsers: async () => users,
    getUser: async (id) => users.find((user) => user.id === id),
    addUser: async (user) => {
      users.push(user);
    },
    deleteUser: async (id) => {
      users = users.filter(user => user.id !== id)
    },
    saveUsers: async () => {
      const operationId = operationIdStorage.getStore();
      console.log('saveUsers', operationId);
      await api.saveUsers(users);
      users = [];
    },
  }
};
