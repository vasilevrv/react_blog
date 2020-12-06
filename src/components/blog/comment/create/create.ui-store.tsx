import React from 'react';
import {action, computed, makeObservable, observable} from "mobx";
import {Post} from "../../../../model/blog/post";
import {postService} from "../../../../service";
import {ListCommentsUIStore} from "../list/list-comments.ui-store";

export class CreateUiStore {

    listUIStore: ListCommentsUIStore|null = null;

    constructor(public post: Post) {
        makeObservable(this);
        this.addComment = this.addComment.bind(this);
    }

    @observable
    private _content: string = '';

    @observable
    public inProgress: boolean = false;

    @computed
    public get isValid(): boolean {
        return this.content.length > 3;
    }

    @computed
    public get content(): string {
        return this._content;
    }

    setListUIStore(store: ListCommentsUIStore) {
        this.listUIStore = store;
    }

    @action
    updateContent(content: string) {
        this._content = content;
    }

    @action
    setInProgress(inProgress: boolean) {
        this.inProgress = inProgress;
    }

    async addComment() {
        try {
            this.setInProgress(true);
            const comment = await postService.createPostComment(this.post.id, this.content);
            this.updateContent("");
            if (this.listUIStore) {
                this.listUIStore.applyComment(comment);
            }
        }
        finally {
            this.setInProgress(false);
        }
    }
}

export const CreateUiStoreContext = React.createContext<CreateUiStore | null>(null);