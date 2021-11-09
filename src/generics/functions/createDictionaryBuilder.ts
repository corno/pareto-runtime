import { IDictionaryBuilder } from "../interfaces/IDictionaryBuilder"

import * as pr from "pareto-runtime"

export function createDictionaryBuilder<T>(): IDictionaryBuilder<T> {
    const imp: { [key: string]: T } = {}
    return {
        add: (key: string, value: T) => {
            imp[key] = value
        },
        toDictionary: () => {
            return {
                forEach: (callback: (entry: T, key: string) => void): void => {
                    pr.Objectkeys(imp).sort().forEach((key) => callback(imp[key], key))
                },
                getLookup: () => {
                    return {
                        getUnsafe: (key: string): T => {
                            const entry = imp[key]
                            if (entry === undefined) {
                                throw new Error(`no such entry: ${key}, options: ${pr.Objectkeys(imp).join(", ")}`)
                            }
                            return entry
                        },
                        with: <RT>(
                            key: string,
                            ifFound: (v: T) => RT,
                            ifNotFound: (keys: string[]) => RT,
                        ): RT => {
                            const entry = imp[key]
                            if (entry === undefined) {
                                return ifNotFound(pr.Objectkeys(imp).sort())
                            }
                            return ifFound(entry)
                        },

                    }
                },
                find: (
                    key,
                    ifFound,
                    ifNotFound,
                ) => {
                    const keys: string[] = []
                    let entry: T | null = null
                    pr.Objectkeys(imp).forEach((k) => {
                        keys.push(k)
                        if (k === key) {
                            entry = imp[k]
                        }
                    })
                    if (entry === null) {
                        return ifNotFound(keys)
                    } else {
                        return ifFound(entry)
                    }
                },
            }
        },
    }
}