import { GameState } from '@/types/GameState'
import type { Player } from '@/types/Player'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Ending from '../Ending'

const { mockResetToDefaultPlayerState, mockResetToDefaultTurnLogState } =
    vi.hoisted(() => ({
        mockResetToDefaultPlayerState: vi.fn(),
        mockResetToDefaultTurnLogState: vi.fn(),
    }))

const mockSwitchGameStateCallback = vi.fn()

const mockAddPoints = vi.fn()
const mockPlayers: Player[] = [
    { name: 'Alice', points: 0, addPoints: mockAddPoints },
    { name: 'Bob', points: 0, addPoints: mockAddPoints },
    { name: 'Caesar', points: 0, addPoints: mockAddPoints },
]

vi.mock('@hiseb/confetti', () => ({
    default: () => <div data-testid="confetti"></div>,
}))

vi.mock('@/store/usePlayerStore', () => ({
    usePlayerStore: () => ({
        players: mockPlayers,
    }),
    nextActivePlayer: vi.fn(),
    resetToDefaultPlayerState: mockResetToDefaultPlayerState,
}))

vi.mock('@/store/useTurnLogStore', () => ({
    resetToDefaultTurnLogState: mockResetToDefaultTurnLogState,
}))

describe('Ending component', () => {
    it('heading display', () => {
        render(<Ending switchGameStateCallback={mockSwitchGameStateCallback} />)
        expect(screen.queryByText('GAME OVER')).toBeVisible()
    })
    it('handles new game', async () => {
        const user = userEvent.setup()
        render(<Ending switchGameStateCallback={mockSwitchGameStateCallback} />)

        const newGameButton = screen.getByRole('button', { name: /New Game/i })
        await user.click(newGameButton)

        expect(mockResetToDefaultPlayerState).toHaveBeenCalled()
        expect(mockResetToDefaultTurnLogState).toHaveBeenCalled()
        expect(mockSwitchGameStateCallback).toHaveBeenCalledWith(
            GameState.STARTING,
        )
    })
})
