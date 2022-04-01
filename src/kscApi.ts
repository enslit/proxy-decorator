import {Api} from "./types";

export const kscApi: Api = {
    posts: [],
    users: [],
    savePosts: async function(posts) {
        return new Promise(((resolve, reject) => {
            try {
                this.posts = [...this.posts, ...posts];
                resolve();
            } catch (error) {
                reject(error);
            }
        }))
    },
    saveUsers: async function(users) {
        return new Promise(((resolve, reject) => {
            try {
                this.users = [...this.users, ...users];
                resolve();
            } catch (error) {
                reject(error);
            }
        }))
    },
};