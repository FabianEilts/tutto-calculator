import { useState } from 'react'
import Playing from './pages/playing/Playing'
import Starting from './pages/starting/Starting'
import { GameState } from './types/GameState'

function App() {
    const [gameState, setGameState] = useState<GameState>(GameState.STARTING)

    const switchGameState = (gameState: GameState) => {
        setGameState(gameState)
    }

    return (
        <div className="p-4">
            {GameState.STARTING === gameState ? (
                <Starting switchGameStateCallback={switchGameState} />
            ) : (
                <Playing switchGameStateCallback={switchGameState} />
            )}
        </div>
    )
}

export default App
