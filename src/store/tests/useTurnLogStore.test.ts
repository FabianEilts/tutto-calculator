import { beforeEach, describe, expect, it } from 'vitest'
import {
    incrementRound,
    resetToDefaultTurnLogState,
    useTurnLogStore,
    writeTurnLogEntry,
} from '../useTurnLogStore'

describe('useTurnLogStore', () => {
    beforeEach(() => {
        useTurnLogStore.setState({
            turnLogEntries: [],
            currentRound: 1,
        })
    })

    describe('writeTurnLogEntry', () => {
        it('should append a new log entry using the current round value', () => {
            writeTurnLogEntry('Alice', 150)

            const state = useTurnLogStore.getState()
            expect(state.turnLogEntries).toHaveLength(1)
            expect(state.turnLogEntries[0]).toEqual({
                playerName: 'Alice',
                round: 1,
                totalPoints: 150,
            })
        })

        it('should track multiple log entries across different rounds', () => {
            writeTurnLogEntry('Alice', 100)

            useTurnLogStore.setState({ currentRound: 2 })
            writeTurnLogEntry('Bob', 250)

            const state = useTurnLogStore.getState()
            expect(state.turnLogEntries).toHaveLength(2)
            expect(state.turnLogEntries[0].round).toBe(1)
            expect(state.turnLogEntries[1]).toEqual({
                playerName: 'Bob',
                round: 2,
                totalPoints: 250,
            })
        })
    })

    describe('incrementRound', () => {
        it('should increment the current round value by 1', () => {
            expect(useTurnLogStore.getState().currentRound).toBe(1)

            incrementRound()
            expect(useTurnLogStore.getState().currentRound).toBe(2)

            incrementRound()
            expect(useTurnLogStore.getState().currentRound).toBe(3)
        })
    })

    describe('resetToDefaultTurnLogState', () => {
        it('should clear all entries and reset the round back to 1', () => {
            useTurnLogStore.setState({
                turnLogEntries: [
                    { playerName: 'Alice', round: 1, totalPoints: 100 },
                ],
                currentRound: 4,
            })

            resetToDefaultTurnLogState()

            const state = useTurnLogStore.getState()
            expect(state.turnLogEntries).toHaveLength(0)
            expect(state.currentRound).toBe(1)
        })
    })
})
