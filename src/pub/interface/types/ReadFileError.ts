
export type ReadFileError =
| ["no entity", {}]
| ["is directory", {}]
| ["other", {
    "message": string
}]