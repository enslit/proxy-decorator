export interface Api {
  posts: IPost[];
  users: IUser[];
  savePosts: (posts: IPost[]) => Promise<void>
  saveUsers: (users: IUser[]) => Promise<void>
}

export interface IUser {
  id: number;
  name: string;
}

export interface IPost {
  id: number;
  owner: number;
  content: string;
}

export interface IUsersModule {
  getUsers: () => Promise<IUser[]>;
  getUser: (id: number) => Promise<IUser | undefined>;
  addUser: (user: IUser) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  saveUsers: () => Promise<void>;
}

export interface IPostsModule {
  getPosts: () => Promise<IPost[]>;
  getPost: (id: number) => Promise<IPost | undefined>;
  addPost: (post: IPost) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  savePosts: () => Promise<void>;
}

export type IPluginApi = IUsersModule & IPostsModule;
