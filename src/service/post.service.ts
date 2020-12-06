import {AxiosInstance} from "axios";
import API from "../utils/api";
import {Post} from "../model/blog/post";
import {PostComment} from "../model/blog/post-comment";
import {PaginatedResult} from "../model/core/api/paginated-result";

class PostService {

    api: AxiosInstance = API;

    createPost(title: string, content: string): Promise<Post> {
        return this.api.post<Post>('blog/posts', {title, content}, {isAuthRequired: true}).then(x => x.data);
    }

    getPosts(page: number, search: string): Promise<PaginatedResult<Post>> {
        return this.api.get<PaginatedResult<Post>>('blog/posts', {params: {page, search, limit: 5}}).then(x => x.data); // limit 5 for a test reasons
    }

    getPost(id: number): Promise<Post> {
        return this.api.get<Post>('blog/posts/' + id).then(x => x.data);
    }

    updatePost(id: number, title: string, content: string): Promise<Post> {
        return this.api.put<Post>('blog/posts/' + id, {title, content}, {isAuthRequired: true}).then(x => x.data);
    }

    deletePost(id: number): Promise<any> {
        return this.api.delete<any>('blog/posts/' + id, {isAuthRequired: true});
    }

    getPostComments(id: number, page: number): Promise<PaginatedResult<PostComment>> {
        return this.api.get<PaginatedResult<PostComment>>('blog/posts/' + id + '/comments',
            {params: {page, limit: 5}, isAuthRequired: true}).then(x => x.data); // limit 5 for a test reasons
    }

    createPostComment(id: number, content: string): Promise<PostComment> {
        return this.api.post<PostComment>('blog/posts/' + id + '/comments', {content}).then(x => x.data);
    }

    removePostComment(id: number): Promise<any> {
        return this.api.delete<any>('blog/post-comments/' + id, {isAuthRequired: true});
    }

    hidePostComment(id: number): Promise<any> {
        return this.api.delete<any>('blog/post-comments/' + id + '/public', {isAuthRequired: true});
    }

    publicPostComment(id: number): Promise<any> {
        return this.api.post<any>('blog/post-comments/' + id + '/public', {}, {isAuthRequired: true});
    }
}

export const postService = new PostService();
