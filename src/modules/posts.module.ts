import {Api, IPost, IPostsModule} from "../types";
import { operationIdStorage } from "../utils";

export class PostsModule implements IPostsModule {
  private posts: IPost[] = [];
  private readonly api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getPosts() {
    return this.posts;
  }

  async addPost(post: IPost) {
    const operationId = operationIdStorage.getStore();
    console.log('addPost', operationId);
    this.posts.push(post);
  }

  async deletePost(postId: number) {
    const operationId = operationIdStorage.getStore();
    console.log('deletePost', operationId);
    this.posts = this.posts.filter(({ id }) => id !== postId);
  }

  async getPost(postId: number): Promise<IPost | undefined> {
    const operationId = operationIdStorage.getStore();
    console.log('getPost', operationId);
    return this.posts.find(({ id }) => id === postId);
  }

  async savePosts(): Promise<void> {
    const operationId = operationIdStorage.getStore();
    console.log('savePosts', operationId);
    try {
      await this.api.savePosts(this.posts);
      this.posts = [];
    } catch (error) {
      console.log('error while saving posts', error);
    }
  }
}
