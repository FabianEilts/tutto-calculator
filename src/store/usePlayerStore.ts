import { createPlayer, type Player } from '@/types/Player'
import { create } from 'zustand'

type PlayersState = {
    players: Player[]
    activePlayer?: Player
}

export const usePlayerStore = create<PlayersState>(() => {
    return {
        players: [],
    }
})

export const addPlayer = (
    name: string,
): { success: boolean; error?: string } => {
    const newPlayer: Player = createPlayer(name)
    const { players } = usePlayerStore.getState()

    if (players.some((p) => p.name === newPlayer.name)) {
        return { success: false, error: 'User with this name already exits' }
    }

    usePlayerStore.setState((state) => ({
        players: [...state.players, newPlayer],
    }))

    if (!usePlayerStore.getState().activePlayer) {
        usePlayerStore.setState(() => ({
            activePlayer: newPlayer,
        }))
    }

    return { success: true }
}

export const removePlayer = (player: Player) => {
    usePlayerStore.setState((state) => ({
        players: state.players.filter((p) => p.name !== player.name),
    }))
}

export const getActivePlayer = (): Player | undefined => {
    return usePlayerStore.getState().activePlayer
}

export const nextActivePlayer = (): Player => {
    const { players, activePlayer } = usePlayerStore.getState()

    if (!activePlayer) {
        throw new ReferenceError('No player is currently set as active.')
    }

    const activePlayerIdx = players.indexOf(activePlayer)

    if (activePlayerIdx === -1) {
        throw new RangeError(
            'The active player was not found in the current players list.',
        )
    }

    const nextIdx = (activePlayerIdx + 1) % players.length
    const nextPlayer = players[nextIdx]
    usePlayerStore.setState(() => ({
        activePlayer: nextPlayer,
    }))

    return nextPlayer
}
