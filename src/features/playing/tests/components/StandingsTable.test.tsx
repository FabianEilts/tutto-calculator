import { usePlayerStore } from '@/store/usePlayerStore'
import type { Player } from '@/types/Player'
import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import StandingsTable from '../../components/StandingsTable'

vi.mock('@/store/usePlayerStore', () => ({
    usePlayerStore: vi.fn(),
}))

describe('StandingsTable component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders empty table when there are no players', () => {
        vi.mocked(usePlayerStore).mockReturnValue({ players: [] })

        render(<StandingsTable />)

        expect(screen.getByText('Pos')).toBeInTheDocument()
        expect(screen.getByText('Player')).toBeInTheDocument()
        expect(screen.getByText('Total Score')).toBeInTheDocument()

        const rows = screen.queryAllByRole('row')
        expect(rows).toHaveLength(1)
    })

    it('renders players sorted by score in descending order with correct positions', () => {
        const mockPlayers: Player[] = [
            { name: 'Charlie', points: 150, addPoints: vi.fn() },
            { name: 'Alice', points: 500, addPoints: vi.fn() },
            { name: 'Bob', points: 300, addPoints: vi.fn() },
        ]
        vi.mocked(usePlayerStore).mockReturnValue({ players: mockPlayers })

        render(<StandingsTable />)

        const rows = screen.getAllByRole('row')
        expect(rows).toHaveLength(4)

        const row1 = within(rows[1])
        expect(row1.getByText('1')).toBeInTheDocument()
        expect(row1.getByText('Alice')).toBeInTheDocument()
        expect(row1.getByText('500')).toBeInTheDocument()

        const row2 = within(rows[2])
        expect(row2.getByText('2')).toBeInTheDocument()
        expect(row2.getByText('Bob')).toBeInTheDocument()
        expect(row2.getByText('300')).toBeInTheDocument()

        const row3 = within(rows[3])
        expect(row3.getByText('3')).toBeInTheDocument()
        expect(row3.getByText('Charlie')).toBeInTheDocument()
        expect(row3.getByText('150')).toBeInTheDocument()
    })
})
