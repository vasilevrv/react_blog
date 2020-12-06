import {User} from "../core/user";

export interface Post {
    id: number;
    user: User;
    title: string;
    content: string;
    createdAt: string;
}