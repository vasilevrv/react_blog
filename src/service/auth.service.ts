import {AxiosInstance} from "axios";
import API from "../utils/api";
import {Auth} from "../model/core/auth";

export class AuthService {

    api: AxiosInstance = API;

    auth(username: string, password: string): Promise<Auth> {
        return this.api.post<Auth>('login_check', {username, password}).then(x => x.data);
    }
}

export const authService = new AuthService();