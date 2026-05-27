import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserPlus } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

function App() {
    return (
        <div className="p-4">
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
                            <Input placeholder="Name" />
                            <Button variant="secondary">
                                <UserPlus />
                                Add
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>
                    </div>
                    <Button size="lg" disabled={true}>
                        Start
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default App
