import { createPlayer, type Player } from '@/types/Player'
import { create } from 'zustand'

type PlayersState = {
    players: Player[]
    active?: Player
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

    return { success: true }
}

export const removePlayer = (player: Player) => {
    usePlayerStore.setState((state) => ({
        players: state.players.filter((p) => p.name !== player.name),
    }))
}
