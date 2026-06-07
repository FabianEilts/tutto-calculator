import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import RankingTable from '../../components/RankingTable'

const { firstPlayer, secondPlayer } = vi.hoisted(() => ({
    firstPlayer: { name: 'First', points: 200, addPoints: vi.fn() },
    secondPlayer: { name: 'Second', points: 100, addPoints: vi.fn() },
}))

const mockPlayers = [firstPlayer, secondPlayer]

describe('RankingTable component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('displays player names and points correctly', () => {
        render(<RankingTable players={mockPlayers} />)

        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('200')).toBeInTheDocument()

        expect(screen.getByText('Second')).toBeInTheDocument()
        expect(screen.getByText('100')).toBeInTheDocument()
    })

    it('renders nothing when players array is empty', () => {
        render(<RankingTable players={[]} />)

        expect(screen.queryByRole('div')).not.toBeInTheDocument()
    })

    it('renders the correct number of player rows', () => {
        render(<RankingTable players={mockPlayers} />)

        expect(screen.queryAllByRole('row')).toHaveLength(
            mockPlayers.length + 1,
        )
    })

    it('calculates the rank starting from 4', () => {
        render(<RankingTable players={mockPlayers} />)

        const tableRows = screen.getAllByRole('row').slice(1)

        expect(tableRows[0].querySelector('td')).toHaveTextContent('4')
        expect(tableRows[1].querySelector('td')).toHaveTextContent('5')
    })
})
