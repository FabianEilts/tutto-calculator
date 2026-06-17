import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

describe('Starting component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders legal info', () => {
        render(<App />)

        expect(screen.getByText('Legal Info')).toBeVisible()
    })
})
