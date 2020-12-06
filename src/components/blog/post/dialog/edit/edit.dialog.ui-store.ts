import React from 'react';
import {action, computed, makeObservable, observable} from "mobx";
import {ListPostUiStore} from "../../list/list-post.ui-store";
import {postService} from "../../../../../service";
import {Post} from "../../../../../model/blog/post";

export class PostEditDialogUIStore
{
    constructor(public post: Post) {
        makeObservable(this);
        this.title = post.title;
        this.content = post.content;
    }

    private listPostUIStore: ListPostUiStore|null = null;

    @observable
    public title: string;

    @observable
    public content: string;

    @observable
    public inProgress: boolean = false;

    @action
    setTitle(title: string) {
        this.title = title;
    }

    @action
    setContent(content: string) {
        this.content = content;
    }

    setListPostUIStore(listPostUIStore: ListPostUiStore) {
        this.listPostUIStore = listPostUIStore;
    }

    @computed
    get isValidTitle(): boolean {
        return this.title.length > 3;
    }

    @computed
    get isValidContent(): boolean {
        return this.content.length > 3;
    }

    @computed
    get isValid(): boolean {
        return this.isValidTitle && this.isValidContent;
    }

    @action
    async update() {
        this.inProgress = true;
        try {
            const updatedPost = await postService.updatePost(this.post.id, this.title, this.content);
            if (this.listPostUIStore) {
                this.listPostUIStore.replacePost(updatedPost);
            }
        }
        finally {
            this.inProgress = false;
        }
    }
}

export const PostEditDialogUIStoreContext = React.createContext<PostEditDialogUIStore | null>(null);