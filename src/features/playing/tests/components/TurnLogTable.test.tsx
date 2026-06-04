import { useTurnLogStore } from '@/store/useTurnLogStore'
import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import TurnLogTable from '../../components/TurnLogTable'

vi.mock('@/store/useTurnLogStore', () => ({
    useTurnLogStore: vi.fn(),
}))

describe('TurnLogTable component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders empty table structure when there are no turn log entries', () => {
        vi.mocked(useTurnLogStore).mockReturnValue({
            turnLogEntries: [],
            currentRound: 1,
        })

        render(<TurnLogTable />)

        expect(screen.getByText('Player')).toBeInTheDocument()
        expect(screen.getByText('Round')).toBeInTheDocument()
        expect(screen.getByText('Total')).toBeInTheDocument()

        const rows = screen.queryAllByRole('row')
        expect(rows).toHaveLength(1)
    })

    it('renders all log entries correctly in the mapped order', () => {
        const mockEntries = [
            { playerName: 'Alice', round: 1, totalPoints: 150 },
            { playerName: 'Bob', round: 1, totalPoints: 200 },
            { playerName: 'Alice', round: 2, totalPoints: 450 },
        ]
        vi.mocked(useTurnLogStore).mockReturnValue({
            turnLogEntries: mockEntries,
            currentRound: 2,
        })

        render(<TurnLogTable />)

        const rows = screen.getAllByRole('row')
        expect(rows).toHaveLength(4)

        const row1 = within(rows[1])
        expect(row1.getByText('Alice')).toBeInTheDocument()
        expect(row1.getByText('1')).toBeInTheDocument()
        expect(row1.getByText('150')).toBeInTheDocument()

        const row2 = within(rows[2])
        expect(row2.getByText('Bob')).toBeInTheDocument()
        expect(row2.getByText('1')).toBeInTheDocument()
        expect(row2.getByText('200')).toBeInTheDocument()

        const row3 = within(rows[3])
        expect(row3.getByText('Alice')).toBeInTheDocument()
        expect(row3.getByText('2')).toBeInTheDocument()
        expect(row3.getByText('450')).toBeInTheDocument()
    })
})
