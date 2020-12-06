import {action, computed, makeObservable, observable} from "mobx";
import {User} from "../model/core/user";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import promise from "promise";
import API from "../utils/api";
import React from "react";
import {authService, userService} from "../service";

export class AuthStore {

    static KEY = 'jwt';

    @observable
    private _token: string = ''

    @observable
    private _user: User|null = null;

    constructor() {
        makeObservable(this);
        this.initAuthHeaderInterceptor();
        this.initUnauthorizedInterceptor();
        this.logout = this.logout.bind(this);
        this._token = localStorage.getItem(AuthStore.KEY) ?? '';
        if (this._token) {
            void this.loadUser();
        }
    }

    @computed
    public get user(): User | null {
        return this._user;
    }

    public set user(value: User | null) {
        this._user = value;
    }

    @computed
    public get isLoggedIn(): boolean {
        return null !== this._user;
    }

    @computed
    public get token(): string {
        return this._token
    }

    public set token(token: string) {
        localStorage.setItem(AuthStore.KEY, token);
        this._token = token;
    }

    @action
    public async login(username: string, password: string) {
        this.token = (await authService.auth(username, password)).token;
        await this.loadUser();
    }

    @action
    public logout() {
        localStorage.removeItem(AuthStore.KEY);
        this.user = null;
        this._token = '';
    }

    @action
    public async loadUser() {
        this.user = await userService.getCurrentUser();
    }

    private initAuthHeaderInterceptor() {
        API.interceptors.request.use((config: AxiosRequestConfig) => {
            if (config.isAuthRequired && this.token) {
                config.headers['Internal-Authorization'] = 'Bearer ' + this.token;
            }
            return config;
        }, (error) => {
            return promise.reject(error);
        });
    }

    private initUnauthorizedInterceptor() {
        API.interceptors.response.use((value: AxiosResponse): AxiosResponse => {
            return value;
        }, (error) => {
            if (error.response?.status === 401) {
                this.logout();
            }
            return Promise.reject(error);
        });
    }
}

export const authStore = new AuthStore();

export const AuthStoreContext = React.createContext<AuthStore | null>(null);