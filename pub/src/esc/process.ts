import * as stream from "stream"

export function runProgram(
    $i: (argument?: string) => void
): void {
    const pa = process.argv
    if (pa.length > 3) { //expected format is 'node <scriptname> <argument>'
        console.error("expecting either 0 or 1 argument, not more")
        processExit(1)
    } else {
        $i(pa[2])
    }
}

export type IStreamConsumer<DataType, EndDataType> = {
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

export function subscribeToProcessBeforeExit(
    $i: ($: number) => void,
) {
    process.on("beforeExit", ($) => {
        $i($)
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


export function processExit(code: number): never {
    process.exit(code)
}
