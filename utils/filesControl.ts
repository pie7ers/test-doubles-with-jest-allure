import * as fs from 'fs'

export function DoesTheFileExist(path: string): boolean {
    try {
        fs.accessSync(path)
        return true
    }
    catch {
        return false
    }
}

export function WriteFile(destinationPath: string, content: string, options?: fs.WriteFileOptions): void {

    let opt = options !== undefined ? options : 'utf-8'
    try {
        fs.writeFileSync(destinationPath, content, opt)
    } catch (error) {
        console.log(`${error}`)
    }
}