import {Context} from "react";
import {useContext} from 'react';

type NonNullable<T> = Exclude<T, null>;

export function useRequiredStore<T>(context: Context<T>): NonNullable<T> {
    if (null === context) {
        throw new Error('Context should be not null');
    }

    // @ts-ignore
    return useStore(context);
}

export function useStore<T>(context: Context<T>): T {
    return useContext(context);
}