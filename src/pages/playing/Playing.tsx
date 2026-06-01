import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, ScrollText, Trophy } from 'lucide-react'
import StandingsTable from './components/StandingsTable'
import TurnLogTable from './components/TurnLogTable'

export default function Playing() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <p className="text-gray-500">Current Turn</p>
                        <p className="text-2xl font-bold">🎯 Alice</p>
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
                            />
                            <Button>
                                Next
                                <ArrowRight />
                            </Button>
                        </div>
                    </Field>
                    <p className="mt-8 text-gray-500">
                        Quick Add (Common Tutto bonuses)
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <Button variant="outline">+500</Button>
                        <Button variant="outline">+1000</Button>
                        <Button variant="outline">+1500</Button>
                        <Button variant="outline">+2000</Button>
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
