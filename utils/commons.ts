const COMMON = 'common'

interface IEmptyObject {
    [key: string]: (string | number | null | undefined)[];
}

export function isEmpty(object: any, emptyType = COMMON): boolean {

    let isEmpty = false
    let empty: IEmptyObject = {
        "common": ['', null, undefined, NaN, "0001-01-01", "0001-01-01T00:00:00Z", "0001-01-01 00:00:00"],
        "zero": ['', null, undefined, NaN, 0, "0"],
        "null": ['', null, "null", undefined, NaN],
        "undefined": ['', null, "null", "undefined", undefined, NaN],
    }

    const emptyArray = empty[emptyType]

    if (emptyArray.includes(object)) {
        return isEmpty = true
    }
    if (typeof object === 'object') {
        return Object.keys(object).length === 0
    }

    return isEmpty
}