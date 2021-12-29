export type IReference<T> = {
    get(): T
    readonly name: string
}