import { kscApi } from './kscApi';
import PluginApi from './api'

const main = async () => {
  const pluginApi = PluginApi(kscApi);

  console.log('users', await pluginApi.getUsers());
  await pluginApi.addUser({ id: 1, name: 'Alex' });
  console.log('users', await pluginApi.getUsers());
  await pluginApi.saveUsers();
  console.log('users', await pluginApi.getUsers());
};

main();
