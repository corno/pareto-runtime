
export type WriteFileErrorType =
| ["no entity", {}]
//| ["is directory", {}]
| ["other", {
    "message": string
}]