import React from 'react';
import {action, computed, makeObservable, observable} from "mobx";
import {AuthStore} from "../../../stores";

export class LoginUiStore
{
    constructor(private authStore: AuthStore) {
        makeObservable(this);
    }

    @observable
    public username: string = '';

    @observable
    public password: string = '';

    @observable
    public invalidCredentials: boolean = false;

    @observable
    public inProgress: boolean = false;

    @computed
    get passwordHelperText(): string {
        return this.invalidCredentials ? 'Invalid username/password': '';
    }

    @computed
    get isValidUsername(): boolean {
        return this.username.length > 3;
    }

    @computed
    get isValidPassword(): boolean {
        return this.username.length > 3;
    }

    @computed
    get isValid(): boolean {
        return this.isValidUsername && this.isValidPassword;
    }

    @action
    setInvalidCredentials(invalidCredentials: boolean) {
        this.invalidCredentials = invalidCredentials;
    }

    @action
    setInProgress(inProgress: boolean) {
        this.inProgress = inProgress;
    }

    @action
    setUsername(username: string): void {
        this.username = username;
    }

    @action
    setPassword(password: string): void {
        this.password = password;
    }

    async auth() {
        try {
            this.setInProgress(true);
            await this.authStore.login(this.username, this.password);
        }
        catch (e) {
            this.setInvalidCredentials(true);
            throw e;
        }
        finally {
            this.setInProgress(false);
        }
    }
}

export const LoginUiStoreContext = React.createContext<LoginUiStore | null>(null);