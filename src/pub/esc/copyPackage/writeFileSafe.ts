import { processExit } from "../process"
import { au, cc } from "../etc"
import { writeFile } from "../fs"

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
    writeFile(
        $.path,
        $.data,
        ($) => {
            switch ($[0]) {
                case "error":
                    cc($[1], ($) => {
                        onError(`could not write '${$in.path}'`)
                        if ($in.exit) {
                            processExit(1)
                        }
                    })
                    break
                case "success":
                    cc($[1], () => {
                        onSuccess()
                    })
                    break
                default:
                    au($[0])
            }
        }
    )
}