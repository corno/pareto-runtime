import * as fs from "fs"
import { Dirent } from "../interface/types/Dirent"
import { DirentType } from "../interface/types/DirentType"
import { MkDirErrorType } from "../interface/types/MkDirError"
import { ReadDirError } from "../interface/types/ReadDirError"
import { ReadFileError } from "../interface/types/ReadFileError"
import { UnlinkErrorType } from "../interface/types/UnlinkErrorType"
import { WriteFileErrorType } from "../interface/types/WriteFileErrorType"




export function readFile(
    path: string,
    callback: (
        $:
            | ["error", {
                type: ReadFileError
            }]
            | ["success", {
                data: string
            }],
    ) => void,
): void {
    fs.readFile(
        path,
        { encoding: "utf-8" },
        (err, data) => {
            if (err === null) {
                callback(["success", {
                    data: data,
                }])

            } else {
                const errCode = err.code
                callback(["error", {
                    type: ((): ReadFileError => {
                        switch (errCode) {
                            case "ENOENT":
                                return ["no entity", {}]
                            case "EISDIR":
                                return ["is directory", {}]

                            default: {
                                console.warn(`unknown error code in readFile: ${err.message}`)
                                return ["other", { message: err.message }]
                            }
                        }
                    })()
                }])
            }
        }
    )
}

export function readdir(
    path: string,
    callback: (
        $:
            | ["error", {
                type: ReadDirError
            }]
            | ["success", {
                files: string[]
            }],
    ) => void,
): void {
    fs.readdir(
        path,
        (err, files) => {

            if (err === null) {
                callback(["success", {
                    files: files,
                }])

            } else {
                const errCode = err.code
                callback(["error", {
                    type: ((): ReadDirError => {
                        switch (errCode) {
                            case "ENOENT":
                                return ["no entity", {}]
                            case "ENOTDIR":
                                return ["is not directory", {}]

                            default: {
                                console.warn(`unknown error code in readdir: ${err.message}`)
                                return ["other", { message: err.message }]
                            }
                        }
                    })()
                }])
            }
        }
    )
}

export function isFile($: DirentType) {
    return $[0] === "File"
}

export function isDirectory($: DirentType) {
    return $[0] === "Directory"
}

export function readdirWithFileTypes(
    path: string,
    callback: (
        $:
            | ["error", {
                type: ReadDirError
            }]
            | ["success", {
                files: Dirent[]
            }],
    ) => void,
): void {
    fs.readdir(
        path,
        {
            withFileTypes: true,
        },
        (err, files) => {

            if (err === null) {
                callback(["success", {
                    files: files.map(($) => {
                        return {
                            name: $.name,
                            type: ((): DirentType => {
                                if ($.isFile()) {
                                    return ["File", {}]
                                } else if ($.isDirectory()) {
                                    return ["Directory", {}]
                                } else if ($.isBlockDevice()) {
                                    return ["BlockDevice", {}]
                                } else if ($.isCharacterDevice()) {
                                    return ["CharacterDevice", {}]
                                } else if ($.isFIFO()) {
                                    return ["FIFO", {}]
                                } else if ($.isSocket()) {
                                    return ["Socket", {}]
                                } else if ($.isSymbolicLink()) {
                                    return ["Socket", {}]
                                } else {
                                    throw new Error(`unexpected Dirent type`)
                                }
                            })()
                        }
                    }),
                }])

            } else {
                const errCode = err.code
                callback(["error", {
                    type: ((): ReadDirError => {
                        switch (errCode) {
                            case "ENOENT":
                                return ["no entity", {}]
                            case "ENOTDIR":
                                return ["is not directory", {}]

                            default: {
                                console.warn(`unknown error code in readdir: ${err.message}`)
                                return ["other", { message: err.message }]
                            }
                        }
                    })()
                }])
            }
        }
    )
}

export function mkdir(
    path: string,
    callback: (
        $:
            | ["error", {
                type: MkDirErrorType
            }]
            | ["success", {
            }],
    ) => void,
) {
    fs.mkdir(
        path,
        { recursive: true },
        (err) => {
            if (err !== null) {
                const errCode = err.code
                callback(["error", {
                    type: ((): MkDirErrorType => {
                        switch (errCode) {
                            // case "ENOENT":
                            //     return ["no entity", {}]
                            // case "EISDIR":
                            //     return ["is directory", {}]
                            default: {
                                console.warn(`unknown error code in mkdir: ${err.message}`)
                                return ["other", { message: err.message }]
                            }
                        }
                    })()
                }])
            } else {
                callback(["success", {}])
            }
        }
    )
}

export function writeFile(
    path: string,
    data: string,
    callback: (
        $:
            | ["error", {
                type: WriteFileErrorType
            }]
            | ["success", {
            }],
    ) => void,
) {
    fs.writeFile(
        path,
        data,
        (err) => {
            if (err !== null) {
                const errCode = err.code
                callback(["error", {
                    type: ((): MkDirErrorType => {
                        switch (errCode) {
                            // case "ENOENT":
                            //     return ["no entity", {}]
                            // case "EISDIR":
                            //     return ["is directory", {}]
                            default: {
                                console.warn(`unknown error code in writeFile: ${err.message}`)
                                return ["other", { message: err.message }]
                            }
                        }
                    })()
                }])
            } else {
                callback(["success", {}])
            }
        }
    )
}

export function unlink(
    path: string,
    callback: (
        $:
            | ["error", {
                type: UnlinkErrorType
            }]
            | ["success", {
            }],
    ) => void,
) {
    fs.unlink(
        path,
        (err) => {
            if (err !== null) {
                const errCode = err.code
                callback(["error", {
                    type: ((): UnlinkErrorType => {
                        switch (errCode) {
                            case "ENOENT":
                                return ["no entity", {}]
                            // case "EISDIR":
                            //     return ["is directory", {}]
                            default: {
                                console.warn(`unknown error code in unlink: ${err.message}`)
                                return ["other", { message: err.message }]
                            }
                        }
                    })()
                }])
            } else {
                callback(["success", {}])
            }

        }
    )
}