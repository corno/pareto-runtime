import * as pr from "pareto-runtime"

export function writeFileSafe(
    $: {
        path: string,
        data: string,
        exit: boolean,
    },
    onSuccess: () => void,
    onError: (message: string) => void,
) {
    const $in = $
    pr.writeFile(
        $.path,
        $.data,
        ($) => {
            switch ($[0]) {
                case "error":
                    pr.cc($[1], ($) => {
                        onError(`could not write '${$in.path}'`)
                        if ($in.exit) {
                            pr.processExit(1)
                        }
                    })
                    break
                case "success":
                    pr.cc($[1], () => {
                        onSuccess()
                    })
                    break
                default:
                    pr.au($[0])
            }
        }
    )
}