import { ResolveError } from "../types/ResolveError"

export type Resolve<EventAnnotation> = () => ResolveError<EventAnnotation> | null

export type IRegistrater<EventAnnotation> = {
    register(reference: Resolve<EventAnnotation>): void
}

export type IResolveRegistry<EventAnnotation> = {
    getRegistrater(): IRegistrater<EventAnnotation>
    resolve(
        onError: (error: ResolveError<EventAnnotation>) => void,
    ): boolean
}
