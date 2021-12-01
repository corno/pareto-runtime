import { processExit } from "../process"
import { au, cc } from "../etc"
import { readFile } from "../fs"

export function readFileSafe(
    $: {
        path: string,
        exit: boolean,
    },
    onSuccess: (data: string) => void,
    onError: (message: string) => void,
) {
    const $in = $
    readFile(
        $.path,
        ($) => {
            switch ($[0]) {
                case "error":
                    cc($[1], ($) => {
                        onError(`could not read '${$in.path}'`)
                        if ($in.exit) {
                            processExit(1)
                        }
                    })
                    break
                case "success":
                    cc($[1], ($) => {
                        onSuccess($.data)
                    })
                    break
                default:
                    au($[0])
            }
        }
    )
}