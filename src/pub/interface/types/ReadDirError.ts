
export type ReadDirError =
| ["no entity", {}]
| ["is not directory", {}]
| ["other", {
    "message": string
}]