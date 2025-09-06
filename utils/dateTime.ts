export function TimeDifference(startTime: Date, endTime: Date): number {
    let time = String((endTime.getTime() - startTime.getTime()) / 1000)
    return Number(parseFloat(time).toFixed(2))
}