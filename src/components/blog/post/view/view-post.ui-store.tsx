import React from 'react';
import {action, makeObservable, observable} from "mobx";
import {Post} from "../../../../model/blog/post";
import {postService} from "../../../../service";

export class ViewPostUiStore
{
    constructor(id: number) {
        makeObservable(this);
        void this.loadData(id);
    }

    @observable
    private post: Post|null = null;

    getPost(): Post|null {
        return this.post;
    }

    @action
    setPost(post: Post) {
        this.post = post;
    }

    async loadData(id: number) {
        await this.loadPost(id);
    }

    async loadPost(id: number) {
        this.setPost(await postService.getPost(id));
    }
}

export const ViewPostUiStoreContext = React.createContext<ViewPostUiStore | null>(null);