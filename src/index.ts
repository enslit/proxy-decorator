import { kscApi } from './kscApi';
import PluginApi from './api'
import {Logger} from "./classes/Logger";

export const PluginLoggerInstance = new Logger(['PLUGIN']);

const main = async () => {
  const pluginApi = PluginApi(kscApi);

  PluginLoggerInstance.log('users', await pluginApi.getUsers());
  await pluginApi.addUser({ id: 1, name: 'Alex' });
  PluginLoggerInstance.log('users', await pluginApi.getUsers());
  await pluginApi.saveUsers();
  PluginLoggerInstance.log('users', await pluginApi.getUsers());

  PluginLoggerInstance.log('posts', await pluginApi.getPosts());
  await pluginApi.addPost({ id: 1, content: 'post 1', owner: 1 });
  PluginLoggerInstance.log('posts', await pluginApi.getPosts());
  await pluginApi.savePosts();
  PluginLoggerInstance.log('posts', await pluginApi.getPosts());
};

main();
