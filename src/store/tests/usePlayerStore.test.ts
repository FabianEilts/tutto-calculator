import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockIncrementRound = vi.hoisted(() => {
    return vi.fn()
})

vi.mock('../useTurnLogStore', () => ({
    incrementRound: mockIncrementRound,
}))

import {
    addPlayer,
    nextActivePlayer,
    removePlayer,
    resetToDefaultPlayerState,
    usePlayerStore,
} from '../usePlayerStore'

describe('usePlayerStore', () => {
    beforeEach(() => {
        usePlayerStore.setState({
            players: [],
            activePlayer: undefined,
        })
        vi.clearAllMocks()
    })

    describe('addPlayer', () => {
        it('should successfully add a player and set them as active if they are the first', () => {
            const result = addPlayer('Alice')

            expect(result).toEqual({ success: true })
            expect(usePlayerStore.getState().players).toHaveLength(1)
            expect(usePlayerStore.getState().players[0].name).toBe('Alice')
            expect(usePlayerStore.getState().activePlayer?.name).toBe('Alice')
        })

        it('should add a second player but not change the active player', () => {
            addPlayer('Alice')
            const result = addPlayer('Bob')

            expect(result).toEqual({ success: true })
            expect(usePlayerStore.getState().players).toHaveLength(2)
            expect(usePlayerStore.getState().activePlayer?.name).toBe('Alice')
        })

        it('should fail and return an error if the name already exists (case-insensitive)', () => {
            addPlayer('Alice')
            const result = addPlayer('alice')

            expect(result.success).toBe(false)
            expect(result.error).toBe('User with this name already exits')
            expect(usePlayerStore.getState().players).toHaveLength(1)
        })
    })

    describe('removePlayer', () => {
        it('should remove a player from the array', () => {
            addPlayer('Alice')
            addPlayer('Bob')
            const alice = usePlayerStore.getState().players[0]

            removePlayer(alice)

            const state = usePlayerStore.getState()
            expect(state.players).toHaveLength(1)
            expect(state.players[0].name).toBe('Bob')
        })
    })

    describe('nextActivePlayer', () => {
        it('should cycle through players and increment the game round when wrapping around', () => {
            addPlayer('Alice')
            addPlayer('Bob')

            const next1 = nextActivePlayer()
            expect(next1.name).toBe('Bob')
            expect(mockIncrementRound).not.toHaveBeenCalled()

            const next2 = nextActivePlayer()
            expect(next2.name).toBe('Alice')
            expect(mockIncrementRound).toHaveBeenCalledTimes(1)
        })

        it('should throw an error if there is no active player', () => {
            expect(() => nextActivePlayer()).toThrow(ReferenceError)
        })
    })

    describe('resetToDefaultPlayerState', () => {
        it('should reset all player points to 0 and make the first player active', () => {
            addPlayer('Alice')
            addPlayer('Bob')

            usePlayerStore.getState().players[0].points = 100
            usePlayerStore.getState().players[1].points = 250
            nextActivePlayer()

            resetToDefaultPlayerState()

            const state = usePlayerStore.getState()
            expect(state.players[0].points).toBe(0)
            expect(state.players[1].points).toBe(0)
            expect(state.activePlayer?.name).toBe('Alice')
        })
    })
})
