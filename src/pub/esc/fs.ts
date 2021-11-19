import * as fs from "fs"



export type ReadFileErrorType =
    | ["no entity", {}]
    | ["is directory", {}]
    | ["other", {
        message: string
    }]

export function readFile(
    path: string,
    callback: (
        $:
            | ["error", {
                type: ReadFileErrorType
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
                    type: ((): ReadFileErrorType => {
                        switch (errCode) {
                            case "ENOENT":
                                return ["no entity", {}]
                            case "EISDIR":
                                return ["is directory", {}]

                            default: {
                                console.warn(`unknown error code: ${err.message}`)
                                return ["other", { message: err.message }]
                            }
                        }
                    })()
                }])
            }
        }
    )
}

export type ReadDirErrorType =
    | ["no entity", {}]
    | ["is directory", {}]
    | ["other", {
        message: string
    }]

export function readdir(
    path: string,
    callback: (
        $:
            | ["error", {
                type: ReadDirErrorType
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
                    type: ((): ReadDirErrorType => {
                        switch (errCode) {
                            case "ENOENT":
                                return ["no entity", {}]
                            case "EISDIR":
                                return ["is directory", {}]

                            default: {
                                console.warn(`unknown error code: ${err.message}`)
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

export type DirentType =
    | ["File", {}]
    | ["Directory", {}]
    | ["BlockDevice", {}]
    | ["CharacterDevice", {}]
    | ["SymbolicLink", {}]
    | ["FIFO", {}]
    | ["Socket", {}]

export type Dirent = {
    name: string
    type: DirentType
}

export function readdirWithFileTypes(
    path: string,
    callback: (
        $:
            | ["error", {
                type: ReadDirErrorType
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
                    type: ((): ReadDirErrorType => {
                        switch (errCode) {
                            case "ENOENT":
                                return ["no entity", {}]
                            case "EISDIR":
                                return ["is directory", {}]

                            default: {
                                console.warn(`unknown error code: ${err.message}`)
                                return ["other", { message: err.message }]
                            }
                        }
                    })()
                }])
            }
        }
    )
}

export type MkDirErrorType =
    //| ["no entity", {}]
    //| ["is directory", {}]
    | ["other", {
        message: string
    }]

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
                                console.warn(`unknown error code: ${err.message}`)
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

export type WriteFileErrorType =
    //| ["no entity", {}]
    //| ["is directory", {}]
    | ["other", {
        message: string
    }]

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
                                console.warn(`unknown error code: ${err.message}`)
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

export type UnlinkErrorType =
    | ["no entity", {}]
    //| ["is directory", {}]
    | ["other", {
        message: string
    }]

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
                                console.warn(`unknown error code: ${err.message}`)
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