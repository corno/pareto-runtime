import * as fs from "fs"

export function readdirSync(
    path: string,
) {
    return fs.readdirSync(
        path,
        { encoding: "utf-8"},
    )
}

export function readFileSync(
    path: string,
) {
    return fs.readFileSync(
        path,
        { encoding: "utf-8"},
    )
}

export function unlinkSync(
    path: string,
) {
    fs.unlinkSync(
        path,
    )
}