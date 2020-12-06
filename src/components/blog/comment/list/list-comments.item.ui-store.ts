import {action, makeObservable, observable} from "mobx";
import {PostComment} from "../../../../model/blog/post-comment";
import {postService} from "../../../../service";
import React from "react";

export class ListCommentsItemUIStore
{
    constructor(comment: PostComment) {
        makeObservable(this);
        this.comment = comment;
    }

    @observable
    public comment: PostComment;

    @action
    setState(publicState: boolean) {
        this.comment.public = publicState;
    }

    async hideComment(comment: PostComment) {
        await postService.hidePostComment(comment.id);
        this.setState(false);
    }

    async publicComment(comment: PostComment) {
        await postService.publicPostComment(comment.id);
        this.setState(true);
    }
}

export const ListCommentsItemUIStoreContext = React.createContext<ListCommentsItemUIStore | null>(null);