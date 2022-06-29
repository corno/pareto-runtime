import { IResolveRegistry, Resolve } from "../interfaces/IResolveRegistry"


export function createResolveRegistry<EventAnnotation>(): IResolveRegistry<EventAnnotation> {
    const references: Resolve<EventAnnotation>[] = []
    return {
        getRegistrater: () => {
            return {
                register: (reference) => {
                    references.push(reference)
                },
            }
        },
        resolve: (onError) => {
            let foundErrors = false
            references.forEach((r) => {
                const result = r()
                if (result !== null) {
                    onError(result)
                    foundErrors = true
                }
            })
            return !foundErrors
        },
    }
}