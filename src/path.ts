import * as pth from "path"

export function join(...paths: string[]) {
    return pth.join(...paths)
}

export function normalize(path: string) {
    return pth.normalize(path)
}

export function basename(path: string) {
    return pth.basename(path)
}

export function dirname(path: string) {
    return pth.dirname(path)
}