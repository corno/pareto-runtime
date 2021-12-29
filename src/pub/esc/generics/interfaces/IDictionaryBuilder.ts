import { IReadonlyDictionary } from "./IReadonlyDictionary"

export type IDictionaryBuilder<T> = {
    add(key: string, value: T): void
    toDictionary(): IReadonlyDictionary<T>
}