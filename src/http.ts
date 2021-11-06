import * as http from "http"
import { IStreamConsumer } from "."

export function doHTTPRequest(
    $: {
        host: string
        path: string
        timeout: number
    },
    $p: {
        onSuccess: () => IStreamConsumer<string, null>
        onNotFound: () => void
        onTimeout: () => void
        onError: ($: string) => void
    }
): void {
    const request = http.request(
        {
            host: $.host,
            path: $.path,
            timeout: $.timeout,
        },
        (res) => {
            if (res.statusCode !== 200) {
                $p.onNotFound()
            } else {
                const streamConsumer = $p.onSuccess()
                //below code is streaming but unstable
                // onSucces(p20.createStream((_limiter, consumer) => {
                //     res.on('data', chunk => {
                //         res.pause()
                //         consumer.onData(chunk.toString()).handle(
                //             _abortRequested => {
                //                 res.resume()
                //             }
                //         )
                //     })
                //     res.on('end', () => {
                //         consumer.onEnd(false, null)
                //     })
                // }))
                res.on(
                    'data',
                    (chunk) => {
                        streamConsumer.onData(chunk.toString())
                    }
                )
                res.on('end', () => {
                    streamConsumer.onEnd(null)
                })
            }
        }
    )
    request.on('timeout', () => {
        $p.onTimeout()
    });
    request.on('error', (e) => {
        $p.onError(e.message)
    });
    request.end()
}
