import { usePlayerStore } from '@/store/usePlayerStore'
import type { Player } from '@/types/Player'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Starting from '../Starting'

vi.mock('@/store/usePlayerStore', () => ({
    usePlayerStore: vi.fn(),
    addPlayer: vi.fn().mockReturnValue({ success: true }),
    removePlayer: vi.fn(),
}))

describe('Starting component', () => {
    const mockSwitchGameStateCallback = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('render headline', () => {
        vi.mocked(usePlayerStore).mockReturnValue({ players: [] })

        render(
            <Starting switchGameStateCallback={mockSwitchGameStateCallback} />,
        )
        expect(screen.getByText('🎲 TUTTO calculator')).toBeVisible()
    })

    it('add and remove player', async () => {
        const user = userEvent.setup()

        vi.mocked(usePlayerStore).mockReturnValue({ players: [] })

        const { rerender } = render(
            <Starting switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        const input = screen.getByPlaceholderText('Name') as HTMLInputElement
        const addButton = screen.getByRole('button', { name: 'Add' })

        await user.type(input, 'Name1')

        const addedPlayers: Player[] = [
            { name: 'Name1', points: 0, addPoints: vi.fn() },
        ]
        vi.mocked(usePlayerStore).mockReturnValue({ players: addedPlayers })

        await user.click(addButton)

        rerender(
            <Starting switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        expect(screen.getByText('Name1')).toBeInTheDocument()

        const tableRow = screen.getByText('Name1').closest('tr')
        if (!tableRow) throw new Error('Could not find table row')

        const deleteButton = within(tableRow).getByRole('button', {
            name: /delete player/i,
        })

        vi.mocked(usePlayerStore).mockReturnValue({ players: [] })

        await user.click(deleteButton)

        rerender(
            <Starting switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        expect(screen.queryByText('Name1')).not.toBeInTheDocument()
    })

    it('start button disabled state', () => {
        vi.mocked(usePlayerStore).mockReturnValue({ players: [] })

        const { rerender } = render(
            <Starting switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        const startButton = screen.getByRole('button', { name: 'Start' })
        expect(startButton).toBeDisabled()

        const mockPlayers: Player[] = [
            { name: 'Player1', points: 0, addPoints: vi.fn() },
            { name: 'Player2', points: 0, addPoints: vi.fn() },
        ]
        vi.mocked(usePlayerStore).mockReturnValue({ players: mockPlayers })

        rerender(
            <Starting switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        expect(startButton).toBeEnabled()
    })
})
