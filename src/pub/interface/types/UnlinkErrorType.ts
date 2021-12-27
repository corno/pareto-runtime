
export type UnlinkErrorType =
| ["no entity", {}]
//| ["is directory", {}]
| ["other", {
    "message": string
}]