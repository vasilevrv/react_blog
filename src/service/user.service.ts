import {AxiosInstance} from "axios";
import API from "../utils/api";
import {User} from "../model/core/user";

export class UserService {

    api: AxiosInstance = API;

    getCurrentUser(): Promise<User> {
        return this.api.get<User>('user', {isAuthRequired: true}).then(x => x.data);
    }
}

export const userService = new UserService();