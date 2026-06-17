import { useState } from 'react'
import Footer from './components/Footer'
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

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="grow p-4">{renderGameContent()}</main>
            <Footer />
        </div>
    )
}

export default App
