import React from 'react';
import {action, computed, makeObservable, observable} from "mobx";
import {ListPostUiStore} from "../../list/list-post.ui-store";
import {postService} from "../../../../../service";

export class PostCreateDialogUIStore
{
    constructor() {
        makeObservable(this);
    }

    private listPostUIStore: ListPostUiStore|null = null;

    @observable
    public title: string = '';

    @observable
    public content: string = '';

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
    async create() {
        this.inProgress = true;
        try {
            const updatedPost = await postService.createPost(this.title, this.content);
            if (this.listPostUIStore) {
                this.listPostUIStore.addPost(updatedPost);
            }
        }
        finally {
            this.inProgress = false;
        }
    }
}

export const PostCreateDialogUIStoreContext = React.createContext<PostCreateDialogUIStore | null>(null);