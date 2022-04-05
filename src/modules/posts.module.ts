import {Api, IPost, IPostsModule} from "../types";
import { operationIdStorage } from "../utils";
import {PluginLoggerInstance} from "../index";
import {RuntimeError} from "../classes/errors";

export class PostsModule implements IPostsModule {
  private posts: IPost[] = [];
  private readonly api: Api;
  private readonly postsModuleLogger = PluginLoggerInstance.createChildLogger(['PostsModule']);

  constructor(api: Api) {
    this.api = api;
  }

  async getPosts() {
    return this.posts;
  }

  async addPost(post: IPost) {
    this.postsModuleLogger.log('addPost', post);
    this.posts.push(post);
  }

  async deletePost(postId: number) {
    this.postsModuleLogger.log('deletePost', postId);
    this.posts = this.posts.filter(({ id }) => id !== postId);
  }

  async getPost(postId: number): Promise<IPost | undefined> {
    this.postsModuleLogger.log('getPost', postId);
    return this.posts.find(({ id }) => id === postId);
  }

  async savePosts(): Promise<void> {
    this.postsModuleLogger.log('savePosts');
    try {
      await this.api.savePosts(this.posts);
      this.posts = [];
    } catch (error) {
      throw new RuntimeError('error while saving posts', error as Error)
    }
  }
}
