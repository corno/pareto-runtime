
export type IReadonlyArray<T> = {
    forEach(callback: (entry: T) => void): void
}