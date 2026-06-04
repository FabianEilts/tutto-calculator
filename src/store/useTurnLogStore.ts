import { create } from 'zustand'

type TurnLogEntry = {
    playerName: string
    round: number
    totalPoints: number
}

type TurnLogEntryState = {
    turnLogEntries: TurnLogEntry[]
    currentRound: number
}

export const useTurnLogStore = create<TurnLogEntryState>(() => {
    return {
        turnLogEntries: [],
        currentRound: 1,
    }
})

export const writeTurnLogEntry = (playerName: string, totalPoints: number) => {
    const currentRound = useTurnLogStore.getState().currentRound
    const newLogEntry: TurnLogEntry = {
        playerName: playerName,
        round: currentRound,
        totalPoints: totalPoints,
    }

    useTurnLogStore.setState((state) => ({
        turnLogEntries: [...state.turnLogEntries, newLogEntry],
    }))
}

export const incrementRound = () => {
    useTurnLogStore.setState((state) => ({
        currentRound: state.currentRound + 1,
    }))
}

export const resetToDefaultTurnLogState = () => {
    useTurnLogStore.setState(() => ({
        turnLogEntries: [],
        currentRound: 1,
    }))
}
