import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Ending from '../Ending'

const mockSwitchGameStateCallback = vi.fn()

describe('Ending component', () => {
    it('heading display', () => {
        render(<Ending switchGameStateCallback={mockSwitchGameStateCallback} />)
        expect(screen.queryByText('GAME OVER')).toBeVisible()
    })
})
