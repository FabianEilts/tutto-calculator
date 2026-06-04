import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { addPlayer, removePlayer, usePlayerStore } from '@/store/usePlayerStore'
import { GameState } from '@/types/GameState'
import { Trash, UserPlus } from 'lucide-react'
import { useState } from 'react'

interface IProps {
    switchGameStateCallback: (gameState: GameState) => void
}

function Starting({ switchGameStateCallback }: IProps) {
    const [playerName, setPlayerName] = useState('')
    const [inputError, setInputError] = useState('')
    const { players } = usePlayerStore()

    const handleAddPlayer = () => {
        const response = addPlayer(playerName)

        if (!response.success && response.error) {
            setInputError(response.error)
            return
        }

        setPlayerName('')
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-center text-2xl py-1">
                    🎲 TUTTO calculator
                </CardTitle>
                <CardDescription>
                    Simple point calculator for the card game TUTTO
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <Field>
                            <Input
                                id="input-invalid"
                                placeholder="Name"
                                value={playerName}
                                aria-invalid={inputError !== ''}
                                onChange={(event) => {
                                    setInputError('')
                                    setPlayerName(event.target.value)
                                }}
                            />
                            {inputError !== '' ? (
                                <FieldDescription>
                                    {inputError}
                                </FieldDescription>
                            ) : (
                                ''
                            )}
                        </Field>
                        <Button variant="secondary" onClick={handleAddPlayer}>
                            <UserPlus />
                            Add
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">
                                    Name
                                </TableHead>
                                <TableHead className="text-right font-bold">
                                    Action
                                </TableHead>
                            </TableRow>
                            {players.map((player, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell>{player.name}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                className="text-red-500"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    removePlayer(player)
                                                }}
                                            >
                                                <Trash />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableHeader>
                    </Table>
                </div>
                <Button
                    size="lg"
                    disabled={players.length < 2}
                    onClick={() => {
                        switchGameStateCallback(GameState.PLAYING)
                    }}
                >
                    Start
                </Button>
            </CardContent>
        </Card>
    )
}

export default Starting
