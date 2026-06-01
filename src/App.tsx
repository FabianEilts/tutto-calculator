import { useState } from 'react'
import Starting from './pages/Starting'
import { GameState } from './types/GameState'

function App() {
    const [gameState, setGameState] = useState<GameState>(GameState.STARTING)

    return (
        <div className="p-4">
            {GameState.STARTING === gameState ? <Starting /> : ''}
        </div>
    )
}

export default App
