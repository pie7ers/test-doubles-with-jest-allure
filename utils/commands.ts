import * as fs from 'fs'

export function mkdir(path: string): void {
    try {
        fs.mkdirSync(path, { recursive: true })
    } catch (error: any) {
        console.log(error.message)
    }
}