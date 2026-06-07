import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Podium from '../../components/Podium'

const { mockFirst, mockSecond, mockThird } = vi.hoisted(() => ({
    mockFirst: { name: 'First', points: 300, addPoints: vi.fn() },
    mockSecond: { name: 'Second', points: 200, addPoints: vi.fn() },
    mockThird: { name: 'Third', points: 150, addPoints: vi.fn() },
}))

describe('Podium component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('display all three places', () => {
        render(
            <Podium first={mockFirst} second={mockSecond} third={mockThird} />,
        )

        expect(screen.queryByText(mockFirst.name)).toBeVisible()
        expect(screen.queryByText(mockSecond.name)).toBeVisible()
        expect(screen.queryByText(mockThird.name)).toBeVisible()
    })

    it('display first two places', () => {
        const { container } = render(
            <Podium first={mockFirst} second={mockSecond} />,
        )

        expect(screen.queryByText(mockThird.name)).not.toBeInTheDocument()

        const thirdColumn = container.querySelector('.text-amber-600')
        expect(thirdColumn).toHaveClass('mt-30')
        expect(thirdColumn).not.toHaveClass('mt-20')
    })
})
