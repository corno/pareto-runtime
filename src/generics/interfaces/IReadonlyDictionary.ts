import { IReadonlyLookup } from "./IReadonlyLookup"


export interface IReadonlyDictionary<T> {
    forEach(callback: (entry: T, key: string) => void): void
    getLookup: () => IReadonlyLookup<T>
    find: <RT>(
        key: string,
        ifFound: (entry: T) => RT,
        ifNotFound: (keys: string[]) => RT,
    ) => RT
}