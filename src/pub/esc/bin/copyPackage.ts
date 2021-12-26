#!/usr/bin/env node

import { paths } from "../../data/packagePaths"
import { JSONparse, JSONstringify, logError } from "../etc"
import { readFileSafe } from "../copyPackage/readFileSafe"
import { writeFileSafe } from "../copyPackage/writeFileSafe"

readFileSafe(
    {
        path: paths.packageTemplate,
        exit: true,
    },
    ($) => {
        const packageTemplate: any = JSONparse($)
        readFileSafe(
            {
                path: paths.livePackage,
                exit: true,
            },
            ($) => {
                const livePackage: any = JSONparse($)
                packageTemplate["dependencies"] = livePackage.dependencies
                packageTemplate["version"] = livePackage.version
                writeFileSafe(
                    {
                        path: paths.target,
                        data: JSONstringify(packageTemplate),
                        exit: true,
                    },
                    () => {
                        // nothing to do
                    },
                    logError,
                )
            },
            logError,
        )
    },
    logError,
)
