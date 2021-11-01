import * as fs from "fs"
import * as pth from "path"
import * as stream from "stream"

export interface IStreamConsumer<DataType, EndDataType> {
    onData(data: DataType): void;
    onEnd(data: EndDataType): void;
}


export function logError(
    message: string
) {
    console.error(message)
}

export function JSONstringify(
    o: any
): string {
    return JSON.stringify(o, undefined, "\t")
}
export function JSONparse(
    str: string
): any {
    return JSON.parse(str)
}

export function StringFromCharCode(
    charCode: number
): string {
    return String.fromCharCode(charCode)
}

export type ErrorType =
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
                type: ErrorType
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
                    type: ((): ErrorType => {
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

export function readdirSync(
    path: string,
): string[] {
    return fs.readdirSync(
        path,
    )
}

export function readFileSync(
    path: string,
): string {
    return fs.readFileSync(path, { encoding: "utf-8" })
}

export function writeFileSync(
    path: string,
    data: string,
): void {
    fs.writeFileSync(path, data, { encoding: "utf-8" })
}

export function unlinkSync(
    path: string,
) {
    fs.unlinkSync(path)
}

export function join(...paths: string[]) {
    return pth.join(...paths)
}

export function basename(path: string) {
    return pth.basename(path)
}

export function dirname(path: string) {
    return pth.dirname(path)
}

export function getDirName() {

}

export function createStdOut() {
    return {
        write: (str: string) => {
            process.stdout.write(str)
        },
    }
}

export function createStdErr() {
    return {
        write: (str: string) => {
            process.stderr.write(str)
        },
    }
}

export function subscribeToStdIn(
    ssp: IStreamConsumer<string, null>,
) {

    process.stdin.setEncoding("utf-8")
    process.stdin.pipe(
        new stream.Writable({
            defaultEncoding: "utf-8",
            write: function (data, _encoding, callback) {
                //eslint-disable-next-line
                ssp.onData(data.toString())
                callback()
            },
        })
    ).on('finish', () => {
        ssp.onEnd(null)
    })
}

export function Objectkeys(o: Object): string[] {
    return Object.keys(o)
}

export function parseNumber(
    str: string,
    radix: number,
): number {
    return parseInt(str, radix)
}