export const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
}