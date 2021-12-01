import * as pr from "pareto-runtime"

export function readFileSafe(
    $: {
        path: string,
        exit: boolean,
    },
    onSuccess: (data: string) => void,
    onError: (message: string) => void,
) {
    const $in = $
    pr.readFile(
        $.path,
        ($) => {
            switch ($[0]) {
                case "error":
                    pr.cc($[1], ($) => {
                        onError(`could not read '${$in.path}'`)
                        if ($in.exit) {
                            pr.processExit(1)
                        }
                    })
                    break
                case "success":
                    pr.cc($[1], ($) => {
                        onSuccess($.data)
                    })
                    break
                default:
                    pr.au($[0])
            }
        }
    )
}