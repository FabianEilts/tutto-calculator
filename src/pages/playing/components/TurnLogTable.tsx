import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

function TurnLogTable() {
    return (
        <Table className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <TableHeader>
                <TableRow className="bg-slate-50 border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-900 py-3 pl-4">
                        Player
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 py-3">
                        Round
                    </TableHead>
                    <TableHead className="text-right font-semibold text-gray-900 py-3 pr-4">
                        Total
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="bg-white border-b border-gray-100">
                    <TableCell className="text-gray-700 py-4 pl-4">
                        Bob
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">1</TableCell>
                    <TableCell className="text-right text-gray-700 py-4 pr-4">
                        200
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default TurnLogTable
