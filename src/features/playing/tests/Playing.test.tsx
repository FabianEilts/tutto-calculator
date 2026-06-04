import { GameState } from '@/types/GameState'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Playing from '../Playing'

const mockAddPoints = vi.fn().mockReturnValue(150)
const mockActivePlayer = {
    name: 'Alice',
    addPoints: mockAddPoints,
}

vi.mock('@/store/usePlayerStore', () => ({
    usePlayerStore: () => ({
        activePlayer: mockActivePlayer,
    }),
    nextActivePlayer: vi.fn(),
    resetToDefaultPlayerState: vi.fn(),
}))

vi.mock('@/store/useTurnLogStore', () => ({
    writeTurnLogEntry: vi.fn(),
    resetToDefaultTurnLogState: vi.fn(),
}))

vi.mock('../components/StandingsTable', () => ({
    default: () => <div data-testid="standings-table">Standings Table</div>,
}))
vi.mock('../components/TurnLogTable', () => ({
    default: () => <div data-testid="turn-log-table">Turn Log Table</div>,
}))

describe('Playing Component', () => {
    const mockSwitchGameStateCallback = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the current active player name', () => {
        render(
            <Playing switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        expect(screen.getByText(/🎯 Alice/i)).toBeVisible()
    })

    it('allows typing into the input field and updates values with quick-add buttons', async () => {
        const user = userEvent.setup()
        render(
            <Playing switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        const input = screen.getByLabelText(
            /Enter Round Points/i,
        ) as HTMLInputElement

        await user.type(input, '100')
        expect(input.value).toBe('100')

        const add500Button = screen.getByRole('button', { name: '+500' })
        await user.click(add500Button)
        expect(input.value).toBe('600')
    })

    it('submits points, updates stores, and clears input on "Next" click', async () => {
        const user = userEvent.setup()
        const { nextActivePlayer } = await import('@/store/usePlayerStore')
        const { writeTurnLogEntry } = await import('@/store/useTurnLogStore')

        render(
            <Playing switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        const input = screen.getByLabelText(/Enter Round Points/i)
        await user.type(input, '200')

        const nextButton = screen.getByRole('button', { name: /Next/i })
        await user.click(nextButton)

        expect(mockActivePlayer.addPoints).toHaveBeenCalledWith(200)
        expect(writeTurnLogEntry).toHaveBeenCalledWith('Alice', 150)
        expect(nextActivePlayer).toHaveBeenCalled()

        expect((input as HTMLInputElement).value).toBe('')
    })

    it('triggers the game state callback when confirming game reset dialog', async () => {
        const user = userEvent.setup()
        render(
            <Playing switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        const alertTrigger = screen.getByRole('button', { name: '' })
        await user.click(alertTrigger)

        const continueButton = screen.getByRole('button', { name: /Continue/i })
        await user.click(continueButton)

        expect(mockSwitchGameStateCallback).toHaveBeenCalledWith(
            GameState.STARTING,
        )
    })

    it('sets up a beforeunload listener on mount and tears it down on unmount', () => {
        const addSpy = vi.spyOn(window, 'addEventListener')
        const removeSpy = vi.spyOn(window, 'removeEventListener')

        const { unmount } = render(
            <Playing switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        expect(addSpy).toHaveBeenCalledWith(
            'beforeunload',
            expect.any(Function),
        )

        unmount()
        expect(removeSpy).toHaveBeenCalledWith(
            'beforeunload',
            expect.any(Function),
        )
    })

    it('prevents default behavior on beforeunload event execution', () => {
        const addSpy = vi.spyOn(window, 'addEventListener')
        render(
            <Playing switchGameStateCallback={mockSwitchGameStateCallback} />,
        )

        const beforeUnloadHandler = addSpy.mock.calls.find(
            (call) => call[0] === 'beforeunload',
        )?.[1] as EventListener

        expect(beforeUnloadHandler).toBeDefined()

        const mockEvent = {
            preventDefault: vi.fn(),
            returnValue: '',
        } as unknown as BeforeUnloadEvent

        beforeUnloadHandler(mockEvent)

        expect(mockEvent.preventDefault).toHaveBeenCalled()
        expect(mockEvent.returnValue).toBe(
            'Möchtest du das Spiel wirklich verlassen?',
        )
    })
})
