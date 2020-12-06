import React from 'react';
import {action, makeObservable, observable} from "mobx";
import {Post} from "../../../../model/blog/post";
import {postService} from "../../../../service";

export class ListPostUiStore {

    constructor() {
        makeObservable(this);
        this.search = this.search.bind(this);
        void this.loadData();
    }

    @observable
    public posts: Post[] = [];

    @observable
    public searchValue: string = '';

    @observable
    public page: number = 1;

    @observable
    public totalPages: number = 1;

    @action
    setPosts(posts: Post[]) {
        this.posts = posts;
    }

    @action
    replacePost(post: Post) {
        const idx = this.posts.findIndex(i => post.id === i.id);
        if (-1 !== idx) {
            this.posts[idx] = post;
        }
    }

    @action
    addPost(post: Post) {
        this.posts.unshift(post);
    }

    @action
    removePostFromStore(post: Post) {
        const idx = this.posts.indexOf(post);
        if (-1 !== idx) {
            this.posts.splice(idx, 1);
        }
    }

    @action
    setSearchValue(value: string) {
        this.searchValue = value;
    }

    @action
    async setPage(page: number) {
        this.page = page;
        await this.loadData();
    }

    @action
    setTotalPages(totalPages: number) {
        this.totalPages = totalPages;
    }

    @action
    async search() {
        this.page = 1;
        await this.loadData();
    }
    
    async removePost(post: Post) {
        await postService.deletePost(post.id);
        this.removePostFromStore(post);
    }

    async loadData() {
        await this.loadPosts();
    }

    async loadPosts() {
        const paginatedResult = await postService.getPosts(this.page, this.searchValue);
        this.setPosts(paginatedResult.items);
        this.setTotalPages(paginatedResult.meta.totalPages);
    }
}

export const ListPostUIStoreContext = React.createContext<ListPostUiStore | null>(null);