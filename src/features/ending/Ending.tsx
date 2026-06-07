import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card'
import {
    resetToDefaultPlayerState,
    usePlayerStore,
} from '@/store/usePlayerStore'
import { resetToDefaultTurnLogState } from '@/store/useTurnLogStore'
import { GameState } from '@/types/GameState'
import confetti from '@hiseb/confetti'
import { RotateCcw } from 'lucide-react'
import { useEffect } from 'react'
import Podium from './components/Podium'
import RankingTable from './components/RankingTable'

interface IProps {
    switchGameStateCallback: (gameState: GameState) => void
}

function Ending({ switchGameStateCallback }: IProps) {
    const players = usePlayerStore().players.toSorted((a, b) => {
        return b.points - a.points
    })

    useEffect(() => {
        confetti({ fade: true })
    }, [])

    const handleNewGame = () => {
        resetToDefaultPlayerState()
        resetToDefaultTurnLogState()
        switchGameStateCallback(GameState.STARTING)
    }

    return (
        <Card className="gap-16">
            <CardTitle className="flex flex-col gap-2 items-center">
                <div className="text-yellow-500 bg-secondary p-2 rounded-full border-yellow-500 border text-3xl">
                    🏆
                </div>
                <h1 className="text-2xl font-bold">GAME OVER</h1>
                <CardDescription>Final Scores & Placements</CardDescription>
            </CardTitle>
            <CardContent>
                <Podium
                    first={players[0]}
                    second={players[1]}
                    third={players[2] ?? undefined}
                />
            </CardContent>
            <CardContent>
                <RankingTable players={players.slice(3)} />
            </CardContent>
            <CardContent>
                <Button className="w-full h-14" onClick={handleNewGame}>
                    <RotateCcw />
                    New Game
                </Button>
            </CardContent>
        </Card>
    )
}

export default Ending
