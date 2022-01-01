import { _encodeURI, _parseInt } from "./reexport_globals"

export function logError(
    message: string
) {
    console.error(message)
}

export function logWarning(
    message: string
) {
    console.warn(message)
}

export function log(
    message: string
) {
    console.log(message)
}

export function trimRight(str: string): string {
    return str.trimRight()
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

export function forEachEntry<T>(
    dictionary: { [key: string]: T },
    callback: (entry: T, key: string) => void,
) {
    Objectkeys(dictionary).forEach((key) => {
        callback(dictionary[key], key)
    })
}

export function encodeURI(
    uri: string,
): string {
    return _encodeURI(uri)
}

export function parseInt(
    str: string,
    radix: number,
): number {
    return _parseInt(str, radix)
}

export function stringIsNaN(str: string): boolean {
    return isNaN(new Number(str).valueOf())
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

/**
 * au means 'assert unreachable'. Used in the 'default' clause of while statements to ensure that
 * all possible cases have been handled
 * @param _x 
 */
export function au<RT>(_x: never): RT {
    throw new Error("unreachable")
}

/**
 * cc means 'change context'. It creates a new scope in which a variable name can be used again
 * (usually '$', a variable name that indicates the current context in pareto)
 * 
 * @param input 
 * @param callback 
 * @returns 
 */
export function cc<T, RT>(input: T, callback: (output: T) => RT): RT {
    return callback(input)
}