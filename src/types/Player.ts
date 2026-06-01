export type Player = {
    name: string
    points: number
    addPoints: (amount: number) => number
}

export const createPlayer = (
    name: string,
    initialPoints: number = 0,
): Player => {
    return {
        name: name,
        points: initialPoints,

        addPoints(amount: number) {
            this.points += amount
            return this.points
        },
    }
}
