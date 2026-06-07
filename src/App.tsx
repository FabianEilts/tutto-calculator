import { useState } from 'react'
import Ending from './features/ending/Ending'
import Playing from './features/playing/Playing'
import Starting from './features/starting/Starting'
import { GameState } from './types/GameState'

function App() {
    const [gameState, setGameState] = useState<GameState>(GameState.STARTING)

    const switchGameState = (gameState: GameState) => {
        setGameState(gameState)
    }

    const renderGameContent = () => {
        switch (gameState) {
            case GameState.STARTING:
                return <Starting switchGameStateCallback={switchGameState} />
            case GameState.PLAYING:
                return <Playing switchGameStateCallback={switchGameState} />
            case GameState.ENDING:
                return <Ending switchGameStateCallback={switchGameState} />
            default:
                return null
        }
    }

    return <main className="p-4">{renderGameContent()}</main>
}

export default App
