import {Api, IUser, IUsersModule} from "../types";
import {PluginLoggerInstance} from "../index";

export const usersModule = (api: Api): IUsersModule => {
  const usersModuleLogger = PluginLoggerInstance.createChildLogger(['UsersModule']);
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
      usersModuleLogger.log('saveUsers');
      await api.saveUsers(users);
      users = [];
    },
  }
};
