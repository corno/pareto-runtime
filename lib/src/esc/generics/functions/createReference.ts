import { IReadonlyLookup } from "pareto-api-core"
import { IReference } from "../interfaces/IReference"
import { IRegistrater } from "../interfaces/IResolveRegistry"
import { AnnotatedString } from "../types/AnnotatedString"

export function createReference<T, EventAnnotation>(
    propertyName: string,
    annotatedName: AnnotatedString<EventAnnotation> | null,
    defaultName: string,
    contextAnnotation: EventAnnotation,
    lookup: IReadonlyLookup<T>,
    registrater: IRegistrater<EventAnnotation>,
): IReference<T> {
    let t: T | null = null
    const name = annotatedName !== null
        ? annotatedName.value
        : defaultName

    registrater.register(() => {
        return lookup.with(
            name,
            (entry) => {
                t = entry
                return null
            },
            (keys) => {
                return {
                    message: `${propertyName} '${name}' not found, choose from ${keys.map((x) => `'${x}'`).join(", ")}`,
                    annotation: annotatedName !== null
                        ? annotatedName.annotation
                        : contextAnnotation,
                }
            }
        )
    })
    return {
        get: (): T => {
            if (t === null) {
                throw new Error("UNEXPECTED: not resolved")
            }
            return t
        },
        name: name,
    }
}