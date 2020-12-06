import {action, makeObservable, observable} from "mobx";
import {PostComment} from "../../../../model/blog/post-comment";
import {Post} from "../../../../model/blog/post";
import {postService} from "../../../../service";
import React from "react";

export class ListCommentsUIStore
{
    constructor(public post: Post) {
        makeObservable(this);
        void this.loadData();
    }

    @observable
    public comments: PostComment[] = [];

    @observable
    public page: number = 1;

    @observable
    public totalPages: number = 1;

    @action
    setComments(comments: PostComment[]) {
        this.comments = comments;
    }

    @action
    applyComment(comment: PostComment) {
        this.comments.push(comment);
    }

    @action
    deleteCommentFromStore(comment: PostComment) {
        const index = this.comments.indexOf(comment);
        if (-1 !== index) {
            this.comments.splice(index, 1);
        }
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

    async deleteComment(comment: PostComment) {
        await postService.removePostComment(comment.id);
        this.deleteCommentFromStore(comment);
    }

    async loadData() {
        const paginatedResult = await postService.getPostComments(this.post.id, this.page);
        this.setComments(paginatedResult.items);
        this.setTotalPages(paginatedResult.meta.totalPages);
    }
}

export const ListCommentsUIStoreContext = React.createContext<ListCommentsUIStore | null>(null);