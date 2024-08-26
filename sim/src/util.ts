export function classList(...classes: (string | undefined)[]) {
    return classes
        .filter((c) => typeof c === "string")
        .reduce((prev, c) => prev.concat(c.split(" ")), [] as string[])
        .map((c) => c.trim())
        .filter((c) => !!c)
        .join(" ")
}
