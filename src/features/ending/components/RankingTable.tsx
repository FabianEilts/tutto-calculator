import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import type { Player } from '@/types/Player'

interface IProps {
    players: Player[]
}

function RankingTable({ players }: IProps) {
    return (
        <div>
            {players.length > 0 ? (
                <Table className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <TableHeader>
                        <TableRow className="bg-slate-50 border-b border-gray-200">
                            <TableHead className="font-semibold text-gray-900 py-3 pl-4">
                                Rank
                            </TableHead>
                            <TableHead className="font-semibold text-gray-900 py-3">
                                Player
                            </TableHead>
                            <TableHead className="text-right font-semibold text-gray-900 py-3 pr-4">
                                Total Score
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {players.map((player, idx) => (
                            <TableRow
                                className="bg-white border-b border-gray-100"
                                key={idx}
                            >
                                <TableCell className="text-gray-700 py-4 pl-4">
                                    {idx + 4}
                                </TableCell>
                                <TableCell className="text-gray-700 py-4">
                                    {player.name}
                                </TableCell>
                                <TableCell className="text-right text-gray-700 py-4 pr-4">
                                    {player.points}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : null}
        </div>
    )
}

export default RankingTable
