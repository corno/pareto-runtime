import * as stream from "stream"

export interface IStreamConsumer<DataType, EndDataType> {
    onData(data: DataType): void;
    onEnd(data: EndDataType): void;
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
