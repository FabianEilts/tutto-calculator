import { GameState } from '@/types/GameState'
import type { Player } from '@/types/Player'
import confetti from '@hiseb/confetti'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Ending from '../Ending'

const { mockResetToDefaultPlayerState, mockResetToDefaultTurnLogState } =
    vi.hoisted(() => ({
        mockResetToDefaultPlayerState: vi.fn(),
        mockResetToDefaultTurnLogState: vi.fn(),
    }))

const mockSwitchGameStateCallback = vi.fn()

const mockAddPoints = vi.fn()
let mockPlayers: Player[] = [
    { name: 'Alice', points: 10, addPoints: mockAddPoints },
    { name: 'Bob', points: 30, addPoints: mockAddPoints },
    { name: 'Caesar', points: 20, addPoints: mockAddPoints },
]

vi.mock('@hiseb/confetti', () => ({
    default: vi.fn(),
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
    beforeEach(() => {
        vi.clearAllMocks()
    })

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

    it('triggers the confetti effect on mount', () => {
        render(<Ending switchGameStateCallback={mockSwitchGameStateCallback} />)

        expect(confetti).toHaveBeenCalledTimes(1)

        expect(confetti).toHaveBeenCalledWith({ fade: true })
    })

    it('correctly sorts players by points in descending order', () => {
        render(<Ending switchGameStateCallback={mockSwitchGameStateCallback} />)

        const playerElements = screen.getAllByText(/(Bob|Caesar|Alice)/)

        expect(playerElements[0]).toHaveTextContent('Caesar')
        expect(playerElements[1]).toHaveTextContent('Bob')
        expect(playerElements[2]).toHaveTextContent('Alice')
    })

    it('handles a large list of players splitting them between Podium and RankingTable', () => {
        mockPlayers = [
            { name: 'Plato', points: 50, addPoints: mockAddPoints },
            { name: 'Socrates', points: 40, addPoints: mockAddPoints },
            { name: 'Aristotle', points: 30, addPoints: mockAddPoints },
            { name: 'Nietzsche', points: 20, addPoints: mockAddPoints },
            { name: 'Kant', points: 10, addPoints: mockAddPoints },
        ]

        render(<Ending switchGameStateCallback={mockSwitchGameStateCallback} />)

        expect(screen.getByText('Plato')).toBeInTheDocument()
        expect(screen.getByText('Kant')).toBeInTheDocument()
    })

    it('handles less than 3 players without crashing', () => {
        mockPlayers = [
            { name: 'First Player', points: 10, addPoints: mockAddPoints },
            { name: 'Second Player', points: 20, addPoints: mockAddPoints },
        ]

        expect(() => {
            render(
                <Ending
                    switchGameStateCallback={mockSwitchGameStateCallback}
                />,
            )
        }).not.toThrow()

        expect(screen.getByText('First Player')).toBeInTheDocument()
    })
})
