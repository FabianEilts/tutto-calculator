import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { nextActivePlayer, usePlayerStore } from '@/store/usePlayerStore'
import { GameState } from '@/types/GameState'
import { ArrowRight, LogOut, ScrollText, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'
import StandingsTable from './components/StandingsTable'
import TurnLogTable from './components/TurnLogTable'

interface IProps {
    switchGameStateCallback: (gameState: GameState) => void
}

export default function Playing({ switchGameStateCallback }: IProps) {
    const { activePlayer } = usePlayerStore()
    const [currentScore, setCurrentScore] = useState('')

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            e.returnValue = 'Möchtest du das Spiel wirklich verlassen?'
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () =>
            window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [])

    const quickAddValue = (value: number) => {
        const newScore =
            parseInt(currentScore === '' ? '0' : currentScore) + value

        setCurrentScore(String(newScore))
    }

    const handleNextPlayersTurn = () => {
        activePlayer?.addPoints(
            parseInt(currentScore === '' ? '0' : currentScore),
        )

        setCurrentScore('')

        try {
            nextActivePlayer()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <div>
                            <p className="text-gray-500">Current Turn</p>
                            <p className="text-2xl font-bold">
                                🎯 {activePlayer?.name}
                            </p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <LogOut />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Do you want to reset the game?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => {
                                            switchGameStateCallback(
                                                GameState.STARTING,
                                            )
                                        }}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Field>
                        <FieldLabel htmlFor="input-points">
                            Enter Round Points
                        </FieldLabel>
                        <div className="flex gap-4">
                            <Input
                                id="input-points"
                                type="number"
                                placeholder="Enter points or blank for 0"
                                value={currentScore}
                                onChange={(event) => {
                                    setCurrentScore(event.target.value)
                                }}
                            />
                            <Button onClick={handleNextPlayersTurn}>
                                Next
                                <ArrowRight />
                            </Button>
                        </div>
                    </Field>
                    <p className="mt-8 text-gray-500">
                        Quick Add (Common Tutto bonuses)
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                quickAddValue(50)
                            }}
                        >
                            +50
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                quickAddValue(100)
                            }}
                        >
                            +100
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                quickAddValue(500)
                            }}
                        >
                            +500
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                quickAddValue(1000)
                            }}
                        >
                            +1000
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-16 flex justify-center px-6">
                <Tabs defaultValue="standings" className="w-full flex flex-col">
                    <TabsList className="self-center mb-2">
                        <TabsTrigger value="standings">
                            <Trophy />
                            Standings
                        </TabsTrigger>
                        <TabsTrigger value="turn-log">
                            <ScrollText />
                            Turn Log
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="standings">
                        <StandingsTable />
                    </TabsContent>
                    <TabsContent value="turn-log">
                        <TurnLogTable />
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    )
}
