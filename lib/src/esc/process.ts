import * as stream from "stream"

export function runProgram(
    $i: (
        $: {
            argument?: string
        },
        // $i: {
        //     onDone: ($: {
        //         success: boolean,
        //     }) => void
        // }
    ) => void
): void {
    const pa = process.argv
    // let isDone = false
    // process.on("beforeExit", () => {
    //     if (!isDone) {
    //         throw new Error("process did not terminate properly, isDone() is never called")
    //     }
    // })
    if (pa.length > 3) { //expected format is 'node <scriptname> <argument>'
        console.error("expecting either 0 or 1 argument, not more")
        processExit(1)
    } else {
        $i(
            {
                argument: pa[2],
            },
            // {
            //     onDone: ($) => {
            //         if (isDone) {
            //             throw new Error("process did not terminate properly, isDone() is called multiple times")
            //         }
            //         if (!$.success) {
            //             process.exit(1)
            //         }
            //     }
            // }
        )
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
