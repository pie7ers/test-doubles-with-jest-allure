export function parseBoolean(boolean:  string | number | boolean): boolean {
    boolean = typeof (boolean) === 'string' ? boolean.toLowerCase() : boolean.toString()
    let myBoolean: { [key: string]: boolean} = {
        "true": true,
        "1": true,
        "false": false,
        "0": false
    }
    return myBoolean[boolean] || false
}