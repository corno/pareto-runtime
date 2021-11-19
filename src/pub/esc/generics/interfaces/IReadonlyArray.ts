
export interface IReadonlyArray<T> {
    forEach(callback: (entry: T) => void): void
}