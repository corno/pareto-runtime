import { ResolveError } from "../types/ResolveError"

export type Resolve<EventAnnotation> = () => ResolveError<EventAnnotation> | null

export interface IRegistrater<EventAnnotation> {
    register(reference: Resolve<EventAnnotation>): void
}

export interface IResolveRegistry<EventAnnotation> {
    getRegistrater(): IRegistrater<EventAnnotation>
    resolve(
        onError: (error: ResolveError<EventAnnotation>) => void,
    ): boolean
}

export type AnnotatedString<EventAnnotation> = {
    value: string
    annotation: EventAnnotation
}