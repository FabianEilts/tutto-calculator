import { useState } from 'react'
import Playing from './pages/playing/Playing'
import Starting from './pages/starting/Starting'
import { GameState } from './types/GameState'

function App() {
    const [gameState, setGameState] = useState<GameState>(GameState.PLAYING)

    return (
        <div className="p-4">
            {GameState.STARTING === gameState ? <Starting /> : <Playing />}
        </div>
    )
}

export default App
