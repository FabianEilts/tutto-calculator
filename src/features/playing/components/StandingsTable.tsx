import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { usePlayerStore } from '@/store/usePlayerStore'

function StandingsTable() {
    const { players } = usePlayerStore()

    return (
        <Table className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <TableHeader>
                <TableRow className="bg-slate-50 border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-900 py-3 pl-4">
                        Pos
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
                {players
                    .toSorted((a, b) => {
                        return b.points - a.points
                    })
                    .map((player, idx) => (
                        <TableRow
                            className="bg-white border-b border-gray-100"
                            key={idx}
                        >
                            <TableCell className="text-gray-700 py-4 pl-4">
                                {idx + 1}
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
    )
}

export default StandingsTable
