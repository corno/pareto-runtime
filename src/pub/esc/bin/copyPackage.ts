#!/usr/bin/env node

import { livePackagePath, packageTemplatePath, targetPath } from "../data/packagePaths"
import { JSONparse, JSONstringify, logError } from "../etc"
import { readFileSafe } from "../copyPackage/readFileSafe"
import { writeFileSafe } from "../copyPackage/writeFileSafe"

readFileSafe(
    {
        path: packageTemplatePath,
        exit: true,
    },
    ($) => {
        const packageTemplate: any = JSONparse($)
        readFileSafe(
            {
                path: livePackagePath,
                exit: true,
            },
            ($) => {
                const livePackage: any = JSONparse($)
                packageTemplate["dependencies"] = livePackage.dependencies
                packageTemplate["version"] = livePackage.version
                writeFileSafe(
                    {
                        path: targetPath,
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