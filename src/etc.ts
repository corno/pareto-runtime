
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

export function Objectkeys(o: Object): string[] {
    return Object.keys(o)
}

export function parseNumber(
    str: string,
    radix: number,
): number {
    return parseInt(str, radix)
}


export function escapeString($: {
    str: string,
    escapeTabsAndNewLines: boolean,
    wrapperToEscape: string | null,
}): string {
    let out = ""
    for (let i = 0; i !== $.str.length; i += 1) {
        const curChar = $.str.charCodeAt(i)


        //solidus characters ( / ) are not escaped!

        //backspace and form feed are escaped using the hexadecimal notation, not the shorthands \b and \f

        if ($.str[i] === "\\") {
            out += "\\\\"
        } else if ($.str[i] === $.wrapperToEscape) {
            out += "\\" + $.wrapperToEscape
        } else if ($.str[i] === "\n") {
            out += $.escapeTabsAndNewLines ? "\\n" : $.str[i]
        } else if ($.str[i] === "\r") {
            out += $.escapeTabsAndNewLines ? "\\r" : $.str[i]
        } else if ($.str[i] === "\t") {
            out += $.escapeTabsAndNewLines ? "\\t" : $.str[i]
        } else if ($.str.charCodeAt(i) < 32) {
            //control character (some of them have already been escaped above)
            out += "\\u" + curChar.toString(16).toUpperCase().padStart(4, "0")
        } else {
            out += $.str[i]
        }
    }
    return out
}

export function getElement<T>(array: T[], index: number) {
    return array[index]
}